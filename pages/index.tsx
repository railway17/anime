import type { NextPage } from 'next'
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import {Header, Footer} from '../libs/components'
import { getRecommendedAnims } from '../libs/service';
import { Anime, PageType, PaginationType } from '../libs/types/data-type';
import styles from '../styles/Home.module.css'
import { AnimeCard, AnimeCardWrapper, PaginationWrapper } from './style';
import { UrlObject } from 'url';
import Link from 'next/link';
import ScrollToTop from 'react-scroll-to-top';
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
  
  const renderCard = () => {
    let cards: any[] = []
    let row: any[] = []
    console.log('chekd data', data.length)
    data?.forEach((anime: Anime, index: number) => {
      row.push(
        <Link key={`${anime.mal_id}-${index}`} href={`${PageType.Anime}/${anime.entry[0]?.mal_id}`}>
          <div className="card sm:w-4/5 cursor-pointer">
            <AnimeCard>
              <img src={anime.entry[0]?.images.jpg.image_url} alt="avatar"/>
            </AnimeCard>
          </div>
        </Link>
      )
      if ((index > 0 && (index + 1) % 4 == 0) || (index == data?.length - 1)) {
        cards.push(
        <div key={`row-${data?.length / 4}`} className="flex sm:flex-wrap sm:justify-center sm:w-4/5">
          {row}
        </div>);
        row = []
      }
    })
    return cards
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
          {renderCard()}
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
