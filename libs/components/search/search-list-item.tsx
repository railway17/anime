import React from 'react'
import { AnimeListItem } from './style'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { AnimeSearchResult, PageType } from '../../types/data-type'
import Link from 'next/link'

interface SearchListItemProps {
    anime: AnimeSearchResult
}

export const SearchListItem: React.FC<React.HTMLAttributes<HTMLDivElement> & SearchListItemProps> = (props) => {
    const { anime } = props
    return (
        <Link href={`${PageType.Anime}/${anime.mal_id}`}>
            <AnimeListItem>
                <img src={anime.images.jpg.image_url} alt=""/>
                <div className="description">
                    <div className="title">{anime.title_japanese}: {anime.title}</div>
                    <div className="status">Movie &#8226; 1 Episode &#8226; {anime.status} </div>
                </div>
                <div>
                    <ChevronRightIcon 
                        className="h-6 w-6 text-grey-300 top-0 right-0 cursor-pointer stroke-1 hover:stroke-2" 
                        aria-hidden="true" />
                </div>
            </AnimeListItem>
        </Link>
    )
}