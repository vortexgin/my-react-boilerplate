import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ReactTable from "react-table";
import DataLoader from "./DataLoader";

let typeInterval = null;

class TableAdmin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reload: props.reload,
            loading: true,
            filter: [],
            sortBy: props.sortBy,
            sortOrder: props.sortOrder,
            page: props.page,
            limit: props.limit
        };
    }

    componentDidMount() {
        this.setState({loading: true}, () => {
            this.props.fetchData(this.state.filter, this.state.sortBy, this.state.sortOrder, this.state.page, this.state.limit)
                .then(response => {
                    this.setState({loading: false})
                });
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.reload !== prevProps.reload && this.props.reload === true) {
            this.setState({reload: true}, () => {
                this.props.fetchData(this.state.filter, this.state.sortBy, this.state.sortOrder, this.state.page, this.state.limit)
                    .then(response => {
                        this.setState({reload: false})
                        this.props.onReload();
                    });
            })
        }
        if (!_.isEqual(this.state.filter, prevState.filter)
            || !_.isEqual(this.state.sortBy, prevState.sortBy)
            || !_.isEqual(this.state.sortOrder, prevState.sortOrder)
            || !_.isEqual(this.state.page, prevState.page)
            || !_.isEqual(this.state.limit, prevState.limit)
        ) {
            this.setState({loading: true}, () => {
                this.props.fetchData(this.state.filter, this.state.sortBy, this.state.sortOrder, this.state.page, this.state.limit)
                    .then(response => {
                        this.setState({loading: false})
                    });
            });
        }
    }

    render() {
        return (
            <div className="table-responsive">
                <ReactTable
                    data={this.props.data}
                    pages={this.props.meta.totalPage}
                    columns={this.props.columns}
                    loading={this.state.loading}
                    manual
                    defaultPageSize={this.state.limit}
                    filterable={true}
                    multiSort={false}
                    onPageChange={(page) => {
                        this.setState({page: page + 1});
                    }}
                    onPageSizeChange={(limit) => {
                        this.setState({limit: limit});
                    }}
                    onSortedChange={(sort) => {
                        this.setState({
                            sortBy: sort[0].id,
                            sortOrder: sort[0].desc === false ? 'asc' : 'desc',
                        });
                    }}
                    onFilteredChange={(filter) => {
                        clearTimeout(typeInterval);
                        typeInterval = setTimeout(() => {
                            this.setState({
                                filter: filter
                            });
                        }, 1500);
                    }}
                    previousText="Sebelumnya"
                    nextText="Selanjutnya"
                    loadingText={<DataLoader/>}
                    noDataText="Tidak ada data dalam database"
                    pageText="Halaman"
                    ofText="dari"
                    rowsText="baris"
                />
            </div>
        );
    }
}

TableAdmin.propTypes = {
    data: PropTypes.array.isRequired,
    meta: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    fetchData: PropTypes.func.isRequired,
    page: PropTypes.number,
    limit: PropTypes.number,
    sortBy: PropTypes.string,
    sortOrder: PropTypes.string,
    notFoundMessage: PropTypes.string,
    reload: PropTypes.bool,
    onReload: PropTypes.func,
};
TableAdmin.defaultProps = {
    page: 1,
    limit: 20,
    sortBy: "id",
    sortOrder: "desc",
    notFoundMessage: "Data tidak ditemukan",
    reload: false,
    onReload: () => {
    },
};

export default TableAdmin;