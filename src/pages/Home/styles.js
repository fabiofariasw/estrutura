import styled from 'styled-components';

export const Container = styled.div`
    color: #000;
    text-align: center;
    display: flex;
    margin: auto;
    flex-direction: row;
    justify-content: center;
    transition: 0.2s;

    button {
        border: none;
        color: #808080;
        background: none;
        
        &:hover {
            filter: brightness(1.5);
        }
    }
    
    div {
        width: 36px;
        color: #808080;
        
    }
`

export const ItemPagination = styled.div`
    background-color: #fff;
    padding: 10px 1rem;
`

export const ItemPaginationOdd = styled.div`
    background-color: #f2f2f2;
    padding: 10px 1rem;
`

export const Header = styled.p`
    font-size: 2em;
    font-weight: 545;
`

export const Button = styled.button`
    margin: 0 10px;
`