/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { SearchBar } from '../search'
import { SearchResult } from '../header/style'
import { getSearchResult } from '../../service'
import { AnimeSearchResult, PaginationType } from '../../types/data-type'
import { SearchListItem } from '../search/search-list-item'

interface ModalProps {
  open: boolean
  onClose: () => void
}

interface AnimeSearchResultProps {
  data: Array<AnimeSearchResult>
  pagination: PaginationType 
}

export default function Modal(props: ModalProps) {
  const [open, setOpen] = useState(false)
  const [searchResult, setSearchResult] = useState<AnimeSearchResultProps|null>(null)
  const cancelButtonRef = useRef(null)
  const [searchStr, setSearchStr] = useState('')
  
  useEffect(() => {
    setOpen(props.open)
    if (!props.open) {
      setSearchResult(null)
    }
  }, [props.open])

  const onSearch = async (search: string) => {
    if (!search) {
      setSearchResult(null)
      return
    }
    setSearchStr(search)
    const result: any = await getSearchResult(search)
    setSearchResult({...result?.data})    
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={props.onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-0 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-4 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-transparent text-left transition-all sm:my-8 sm:w-full sm:max-w-lg md:w-3/5">
                <div>
                  <XMarkIcon 
                    className="h-6 w-6 text-grey-300 absolute top-0 right-0 cursor-pointer stroke-1 hover:stroke-2 bg-white rounded-xl" 
                    aria-hidden="true" 
                    onClick={props.onClose}
                  />
                </div>
                <div className="bg-transparent px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        <SearchBar onSearch={onSearch}/>
                      </Dialog.Title>
                      <div className="mt-2">
                        <SearchResult>
                          {searchResult?.data ? searchResult.data.map((anime)=> {
                            return (
                              <SearchListItem anime={anime} key={anime.mal_id} />
                            )
                          }) : (searchResult?.data.length === 0 && searchStr) ? 
                          <span>
                            Oops~ it seems there is nothing for &#39;${searchStr}&#39;
                          </span> :
                          <span>
                            No search result...
                          </span>}
                        </SearchResult>
                      </div>
                    </div>
                  </div>
                </div>                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
