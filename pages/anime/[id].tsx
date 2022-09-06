import Link from 'next/link'
import React from 'react'
import { ChevronLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { AnimeDetailWrapper, LineItem } from './style'
import { GetServerSidePropsContext } from 'next'
import { getAnimeById } from '../../libs/service'
import { AnimeDetailData } from '../../libs/types/data-type'
import { formatNumber } from '../../libs/util'

interface AnimeDetailProps {
    data: AnimeDetailData
}

interface LineItem {
    left: string | number
    right: string | number
}

export default function AnimeDetail(props: AnimeDetailProps) {
    const { data } = props
    const lineItems: Array<LineItem> = [
        {
            left: 'Type',
            right: 'Movie'
        },
        {
            left: 'Source',
            right: data?.type
        },
        {
            left: 'Episode',
            right: 1
        },
        {
            left: 'Status',
            right: data?.status
        }        
    ]

    const scoreItems: Array<LineItem> = [
        {
            left: 'Score',
            right: formatNumber(data?.score) || 0,
        },
        {
            left: 'Rank',
            right: formatNumber(data?.rank) || 0,
        },
        {
            left: 'Popularity',
            right: formatNumber(data?.popularity) || 0,
        }
    ]
    return (
        <AnimeDetailWrapper>
            <div className="h-full">
                <div className="navigator flex m-8 ml-0">
                    <Link href={"/"}>
                        <ChevronLeftIcon 
                            className="h-6 w-6 text-grey-300 top-0 right-0 cursor-pointer stroke-1 hover:stroke-2 -ml-1" 
                            aria-hidden="true" />
                    </Link>
                    <span className="ml-4">Go back to Main</span>
                </div>

                <div className="content md:flex w-full">
                    <div className="img md:w-1/3 sm:w-full md:mr-4">
                        <img className="rounded-2xl shadow-md sm:w-full" src={data.images.jpg.image_url} alt="" />
                    </div>
                    <div className="md:w-2/3 sm:w-full flex flex-col justify-between sm:mt-2">
                        <div>
                            <div className="title flex font-bold text-2xl items-center">
                                {data.title}
                                <CheckCircleIcon 
                                    className="h-6 w-6 text-white top-0 right-0 cursor-pointer fill-green-500 ml-4" 
                                    aria-hidden="true"
                                />
                            </div>
                            {
                                lineItems.map((line: LineItem) => (
                                    <LineItem key={line.left}>
                                        <div>{line.left}</div>
                                        <div className=" h-px w-full bg-gray-300 lg:w-1/3"></div>
                                        <div>{line.right}</div>
                                    </LineItem>
                                ))
                            }                 
                        </div>
                        <div className="flex justify-center">
                            {
                                scoreItems.map((score: LineItem) => (
                                    <div key={score.left} className="m-2 text-center">
                                        <div className="font-medium text-2xl">{score.right}</div>
                                        <div className="font-medium text-2xl text-gray-300">{score.left}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="description w-full">
                    <div className="font-bold text-xl m-8 ml-0">Description</div>
                    <div>{data.synopsis}</div>
                </div>
            </div>
        </AnimeDetailWrapper>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const { id } = ctx.params as {id: string};
    const data = await getAnimeById(id)
    return {
      props: {...data?.data},
    }
  }