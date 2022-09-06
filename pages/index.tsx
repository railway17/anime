import type { NextPage } from 'next'
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useState } from 'react';
import Image from 'next/image'
import styled from 'styled-components'
import ReactPaginate from 'react-paginate';
import {Header, Footer} from '../libs/components'
import { getRecommendedAnims } from '../libs/service';
import { Anime, PageType, PaginationType } from '../libs/types/data-type';
import styles from '../styles/Home.module.css'
import { UrlObject } from 'url';
import Link from 'next/link';
import ScrollToTop from 'react-scroll-to-top';
import { IMAGE_DOMAIN } from '../libs/const';

export const PaginationWrapper = styled.div`
  margin-top: 12px;

  .pagination {
      display: flex;
      padding-left: 0;
      list-style: none;
  }
    
  .pagination li {
      display: list-item;
      text-align: -webkit-match-parent;
  }

  .pagination li a {
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
      padding: 0.375rem 0.75rem;
      position: relative;
      display: block;
      color: #0d6efd;
      text-decoration: none;
      background-color: #fff;
      border: 1px solid #dee2e6;
      transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }

  .pagination li a:hover {
      z-index: 2;
      color: #0a58ca;
      background-color: #e9ecef;
      border-color: #dee2e6;
  }

  .pagination li:not(:first-child) a {
      margin-left: -1px;
  }
    
  .pagination li.active a {
      z-index: 3;
      color: #fff;
      background-color: #0d6efd;
      border-color: #0d6efd;
  }

  .pagination li.disabled a {
      color: #6c757d;
      pointer-events: none;
      background-color: #fff;
      border-color: #dee2e6;
  }
`

export const AnimeCardWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`

export const AnimeCard = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  box-shadow: 2px 2px 2px 3px lightgray;
  border-radius: 16px;
  transition: box-shadow 0.3s ease-in-out;        

  &:hover {
      box-shadow: 1px 1px 1px 1px lightgray;
  }

  img {
      max-height: 450px;
      border-radius: 16px;
      margin: auto;        
  }

  @media(max-width: 640px) {
      width: 80%;
      margin:
  }
`
interface AnimeDataProps {
  data: Array<Anime>
  pagination: PaginationType 
  setLoading: (loading: boolean) => void
}

const Home: NextPage<AnimeDataProps> = (props: AnimeDataProps) => {  
  
  const router = useRouter()
  const { page } = router.query
  const { data, pagination } = props
  const [totalPages, setTotalPages] = useState(pagination?.last_visible_page)
  const [curPage, setCurPage] = useState(page ? parseInt(page as string) : 1)
  
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurPage(selectedItem.selected + 1);
    props.setLoading(true)
    let target: UrlObject = {pathname: PageType.Home}
    if (selectedItem.selected) { // if selected page is bigger than 1, append query param
      target = {...target, query: {page: selectedItem.selected + 1}}
    }
    router.push(target)    
  }
  
  return (
    <div className="w-full">
      <ScrollToTop smooth/>
      <Head>
        <title>Anime</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <AnimeCardWrapper>
          <div className='grid grid-cols-4 gap-y-2 gap-x-4 sm:grid-cols-1 w-full sm:w-4/5 h-full'>
          {
            data?.map((anime: Anime, index: number) => {
              const src = anime.entry[0]?.images.jpg.image_url?.replace(IMAGE_DOMAIN, "")
              return (
                  <Link key={`${anime.mal_id}-${index}`} href={`${PageType.Anime}/${anime.entry[0]?.mal_id}`}>
                    <AnimeCard>
                      <div className="card w-full cursor-pointer relative">
                          <Image layout="responsive" objectFit='fill' width="100%" height="100%" src={src} alt="avatar"/>
                      </div>
                    </AnimeCard>
                  </Link>
              )})
            }
          </div>
        </AnimeCardWrapper>
        <PaginationWrapper>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            hrefBuilder={(pageIndex: number, pageCount: number, selectedPage: number)=> {
              return `?page=${pageIndex}`
            }}
            hrefAllControls={true}
            containerClassName="pagination"
            activeClassName="active"       
            forcePage={curPage - 1}     
          />
        </PaginationWrapper>
      </main>
      <Footer />
    </div>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { page } = ctx.query;
  const pageNumber = page ? parseInt(page as string) : 0
  const data = await getRecommendedAnims(pageNumber > 0 ? pageNumber - 1 : 0)
  return {
    props: {...data?.data},
  }
}

export default Home
