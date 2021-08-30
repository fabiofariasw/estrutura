import React, { useState, useEffect } from 'react';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import { Button, Container, Header, ItemPagination, ItemPaginationOdd } from './styles';
import { api } from '../../services/api';

import { useDebouncedCallback } from 'use-debounce';
import { usePage } from '../../contexts/pageContext';

export function Home() {

    const { numberPage } = usePage();
    const [data, setData] = useState([])
    const [currentData, setCurrentData] = useState([])
    const [currentFilter, setCurrentFilter] = useState()
    const [currentSortBy, setCurrentSortBy] = useState()
    const [currentFilterName, setCurrentFilterName] = useState('')
    const [page, setPage] = useState(numberPage)
    const [totalPages, setTotalPages] = useState(null)
    const [loading, setLoading] = useState(false)
    const filter = [
        { key: 'Open', value: 'open' },
        { key: 'Closed', value: 'closed' },
    ];
    const sortBy = [
        { key: 'Mais novos', value: {sort: 'created', direction: 'desc'}},
        { key: 'Mais antigos', value: {sort: 'created', direction: 'asc'}},
        { key: 'Mais comentados', value: {sort: 'comments', direction: 'desc'}},
    ];
    const limit = 10;
    const auxInitial = 6;
    const auxEnd = 8
    
    async function getIssues() {
        localStorage.setItem('numberPage', page);
        setLoading(true)
        
        try {
            const { data, headers } = await api.get(`repos/facebook/react/issues?per_page=${limit}&page=${page}`);
            setData(data);
            setCurrentData(data);
            setLoading(false);
            if(!totalPages) {
                const arrayLink = headers.link.split(',');
                const filterLastRequisition = arrayLink.filter(e => {
                    if (e.endsWith('rel=\"last\"')) {
                        return e;
                    };
                });
                
                if (filterLastRequisition && filterLastRequisition.length > 0) {
                    const indexSearch = filterLastRequisition[0].indexOf('&page=');
                    const quantityByPages = filterLastRequisition[0].substring(indexSearch + auxInitial, indexSearch + auxEnd);
                    setTotalPages(quantityByPages);
                }
            };
        }
        catch (err) {
            setLoading(false)
            console.log(err);
        }
    }

    const debouncedFilter = useDebouncedCallback(() => {
        objectMount()
    }, 1000)
    
    const onFilterChange = (e) => {
        setCurrentFilter(e);
        
        if (e) {
            async function getFilter() {
                try {
                    const { data } = await api.get(`repos/facebook/react/issues?per_page=${limit}&page=1&state=${e}`)
                    setCurrentData(data)
                }
                catch (err) {
                    console.log(err)
                }
            }
            getFilter()
        }
        else {
            setCurrentData(data)
        }
    }
    
    const onSortChange = (e) => {
        setCurrentSortBy(e);
        
        if (e) {
            const currentSort = e.sort;
            const currentDirection = e.direction
            
            async function getFilter() {
                try {
                    const response = await api.get(`repos/facebook/react/issues?per_page=10&page=1&sort=${currentSort}&direction=${currentDirection}`)
                    setCurrentData(response.data)
                }
                catch (err) {
                    console.log(err)
                }
            }
            getFilter()
        }
        else {
            setCurrentData(data)
        }
    }

    function objectMount() {
        const obj = data.map(item => {
            return {
                title: item.title,
                state: item.state,
                created_at: item.created_at,
                comments: item.comments,
            }
        })

        const namesFilter = obj.filter(item => item.title.includes(currentFilterName))
        setCurrentData(namesFilter)

        if (currentFilterName.trim().length === 0) {
            setCurrentData(data)
        }
    }

    function handleFilterName(e) {
        setCurrentFilterName(e.target.value)
        debouncedFilter()
    }

    function preview() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function next() {
        if (page < totalPages) {
            return setPage(page + 1);
        }
    }

    function previewFirst() {
        if (page > 1) {
            setPage(1);
        }
    }

    function nextLast() {
        if (page < totalPages) {
            return setPage(totalPages);
        }
    }

    useEffect(() => {
        getIssues()
    }, [page])

    const templateBodyName = (rowData, e) => {
        const index = e.rowIndex + 1
        const result = index % 2

        if (result !== 0) {
            return (             
                <ItemPaginationOdd>
                        <p>Title: {rowData.title}</p>
                        <span>State: {rowData.state}</span>
                        <br />
                        <span>Created At: {rowData.created_at}</span>
                        <br />
                        <span>Comments: {rowData.comments}</span>
                </ItemPaginationOdd>
            )
        }

        else {
            return (
                <ItemPagination>
                        <p>Title: {rowData.title}</p>
                        <span>State: {rowData.state}</span>
                        <br />
                        <span>Created At: {rowData.created_at}</span>
                        <br />
                        <span>Comments: {rowData.comments}</span>
                </ItemPagination>
            )
        }
    }

    const renderHeader = () => {
        return (
            <div
                style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                className="table-header">
                Issues
                <span
                    style={{marginLeft: '10px'}} 
                    className="p-input-icon-left"
                >
                    <i className="pi pi-search" />
                    <InputText type="search"
                        style={{minWidth: '280px'}}
                        onInput={handleFilterName}
                      placeholder="Enter the name of the issue" />
                </span>
                <div>
                <Dropdown
                    style={{minWidth: '150px'}}
                    value={currentFilter}
                    options={filter}
                    onChange={(e) => onFilterChange(e.target.value)}
                    optionLabel="key"
                    placeholder="Filter by"
                    showClear={true}
                />
                </div>
                <div>

                <Dropdown
                    style={{minWidth: '170px'}}
                    value={currentSortBy}
                    options={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    optionLabel="key"
                    placeholder="Sort by"
                    showClear={true}
                />
                </div>
            </div>
        );
    }

    const footer = (
        <Container>
            <Button 
                onClick={previewFirst}
                className="pi pi-angle-double-left"
            />
            
            <Button 
                onClick={preview}
                className="pi pi-angle-left"
            />

            <div id='page'>
                <label for='page'>{page}</label>
            </div>
            
            <Button
                onClick={next}
                className="pi pi-angle-right"
            />
                        
            <Button
                onClick={nextLast}
                className="pi pi-angle-double-right"
            />
        </Container>
    )
    
    return (
        <>
            <Container>
                <Header>Listing React Issues</Header>
            </Container>
            <div>
                <div className="card">
                    <DataTable
                        footer={footer}
                        value={currentData}
                        style={{marginTop: "20px", border: '1px solid #D3D3D3'}}
                        header={renderHeader()}
                        loading={loading}
                        loadingIcon="pi pi-spinner"
                    >
                        <Column
                            style={{padding: '0'}}
                            body={templateBodyName}
                            field="title"
                        />
                    </DataTable>
                </div>
            </div>
        </>
    )
}