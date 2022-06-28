import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const SearchBox = (props) => {
	return (
		<>
            <Form.Control
            style={{width: '15%'}}
            value={props.value}
            onChange={(event) => props.setSearchValue(event.target.value)}
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            />
		</>
	);
};

export default SearchBox;