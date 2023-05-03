import React from 'react'

// custom components
import MaterialSelect from './MaterialSelect'

import sass from '../styles/sass/SpecialityField.scss'

const SpecialityField = ({ classes, img, options, onChange, defaultVal }) => {
  return (
    <div className={sass.container}>
      <img className={sass.img} src={img} />
      <MaterialSelect
        className={sass.options}
        options={options}
        value={defaultVal}
        onChange={onChange}
        isClearable={true}
        isSearchable={true}
        placeholder={'Chọn...'}
        noOptionsMessage={() => 'Chưa có lựa chọn'}
      />
    </div>
  )
}

export default SpecialityField
