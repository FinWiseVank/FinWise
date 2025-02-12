import React from 'react';
import './FormTemplate.css';

const FormTemplate = ({ children, onSubmit, onCancel }) => {
  return (
    <div className="form-overlay">
      <div className="form-container">
        <form onSubmit={onSubmit}>
          {children}
          <div className="form-buttons">
            <button type="submit" className="form-submit-button">Agregar</button>
            <button type="button" className="form-cancel-button" onClick={onCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormTemplate;
