import React from 'react';

import { SelectField, MenuItem, IconButton } from 'material-ui';
import { blue400, blue300 } from 'material-ui/styles/colors';

import NextIcon from 'material-ui/svg-icons/image/navigate-next';
import PrevIcon from 'material-ui/svg-icons/image/navigate-before';

class Paging extends React.Component {
	handleSizeChange = (event, index, size) => {
		this.props.onNewPaging(0,size);
	}

	handlePageChange = (page) => {
		this.props.onNewPaging(this.props.paging.page + page,this.props.paging.size);
	}

	render(){
		let SelectFieldBody = this.props.pageSizes.map((item, index) => <MenuItem key={index} value={item} primaryText={item} label={item} />);		
		return(
			<div>
				<div style={{ float:'right', marginTop: '20px', }}>
					<IconButton style={{ marginTop: '0px', float:'right',}}  onClick={() => this.handlePageChange(1)} disabled={(this.props.paging.page + 1) * this.props.paging.size >= this.props.paging.total? true : false}>
						<NextIcon color={blue400} hoverColor={blue300} />
					</IconButton>
					<span style={{  float:'right',  marginTop: '15px'}} >{ (this.props.paging.page+1) + " / " + Math.ceil(this.props.paging.total / this.props.paging.size) }</span>
					<IconButton style={{ marginTop: '0px', float:'right',}} onClick={() => this.handlePageChange(-1)} disabled={this.props.paging.page === 0? true : false}>
						<PrevIcon color={blue400} hoverColor={blue300} />
					</IconButton>
				</div>
					<SelectField style={{marginLeft: '20px', width: '150px', float: 'right',  }} floatingLabelText="Per page" value={this.props.paging.size} onChange={this.handleSizeChange}>
						{ SelectFieldBody }
					</SelectField>
			</div>
	)};
}
export default Paging;