import styled from 'styled-components'

export const SearchBarContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    
    input {
        width: 100%;
        padding: 16px;
        padding-left: 50px;
        background: lightgrey;
        border-radius: 28px;
        outline: none;
    }
    
`

export const AnimeListItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    position: relative;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
    
    &:hover {
        background: #EEE
    }
    
    .description {
        width: 70%;
        text-align: left;
    }

    img {
        width: 48px;
        height: 56px;
        border-radius: 8px;
        border: 1px solid lightgrey;
    }
`