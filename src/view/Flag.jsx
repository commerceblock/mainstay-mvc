import React from 'react';
import classNames from 'classnames';


const Flag = ({ label, viewType, className }) => (
    <span className={classNames('flag', `flag-${viewType}`, className)}>{label}</span>
);


Flag.defaultProps = {
    classNames: '',
    viewType: 'default',
};


export default Flag
