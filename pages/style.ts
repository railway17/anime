import styled from 'styled-components'

export const PaginationWrapper = styled.div`

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

    .card {
        padding: 12px;
    }    
`

export const AnimeCard = styled.div`
    width: 100%;
    height: 100%;

    img {
        max-height: 450px;
        border-radius: 16px;
        margin: auto;
        width: 99%;
        height: 99%;
        box-shadow: 1px 1px 1px 1px lightgray;
        transition: box-shadow 0.3s ease-in-out;        
    }

    img:hover {
        box-shadow: 2px 2px 2px 3px lightgray;
    }
`