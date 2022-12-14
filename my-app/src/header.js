import React from 'react';
import SearchForm from "./SearchForm";
import "./header.css";

const Header = () => {
  return (
    <div className='holder'>
        <header className='header'>
            <div className='header-content flex flex-c text-center text-white'>
                <h2 className='header-title text-capitalize'>ACIC HELPER</h2><br />
                <p className='header-text fs-15 fw-4'>"The ACIC project expands the data collection and curation efforts from a manual and human-expert-only process to an ICT-supported
screening, collecting, and sorting process for the inclusion of eligible publications in respective reference libraries." <br/><br/>
                ACIC 1.0 - Sabrina Fang, Jeffrey Qiu, Victoria Nguyen, Zhuoyan Liu <br/>
                ACIC 2.0 - Sabrina Fang, Jeffrey Qiu, Augene Pak, Zefan Lu &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                </p>
                <SearchForm />
            </div>
        </header>
    </div>
  )
}

export default Header