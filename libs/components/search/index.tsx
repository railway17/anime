import React, { useState, useEffect } from 'react'
import { SearchBarContainer } from './style'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface SearchProps {
    onSearch: (value: string) => void
}

export const SearchBar: React.FC<React.HTMLAttributes<HTMLDivElement> & SearchProps> = (props) => {
    const [searchStr, setSearchStr] = useState('')

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            console.log(searchStr)
            props.onSearch(searchStr)
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchStr])

    return (
        <SearchBarContainer>
            <div className="relative w-full">
                <input value={searchStr} onChange={(e) => setSearchStr(e.target.value)} />
                <MagnifyingGlassIcon className="h-6 w-6 text-grey-300 absolute top-4 left-4" aria-hidden="true" />
            </div>
        </SearchBarContainer>
    )
}