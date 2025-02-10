'use client';

import { Tab, Tabs } from '@heroui/react';
import { Member } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Key, useTransition } from 'react';
import React from 'react'
import MembersCard from '../members/MembersCard';
import LoadingComponent from '@/components/LoadingComponent';

type Props = {
    members: Member[];
    likeIds: string[];
}

export default function ListsTab({ members, likeIds }: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTansition] = useTransition();

    const tabs = [
        { id: 'source', label: 'Members I have liked' },
        { id: 'target', label: 'Members taht liked me' },
        { id: 'mutual', label: 'Mutual likes' },
    ]

    function handleTabChange(key: Key) {
        startTansition(() => {
            const params = new URLSearchParams(searchParams);
            params.set('type', key.toString());
            router.replace(`${pathname}?${params.toString()}`);
        })

    }

    return (

        <div className='flec flex-col w-full mt-10 gap-5'>
            <Tabs
                aria-label='Like tabs'
                items={tabs}
                color='secondary'
                onSelectionChange={(key) => handleTabChange(key)}
            >
                {(item) => (
                    <Tab key={item.id} title={item.label}>
                        {isPending ? (
                            <LoadingComponent />
                        ) : (
                            <>
                                {members.length > 0 ? (
                                    <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-8'>
                                        {members.map(member => (
                                            <MembersCard key={member.id} member={member} likeIds={likeIds} />
                                        ))}
                                    </div>
                                ) : (
                                    <div>No members for this filter</div>
                                )}
                            </>
                        )}

                    </Tab>
                )}
            </Tabs>
        </div>

    )
}

