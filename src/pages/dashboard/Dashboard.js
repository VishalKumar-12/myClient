import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import getBaseUrl from '../../utils/baseURL';
import { MdIncompleteCircle } from 'react-icons/md';
import { BiBookAdd } from 'react-icons/bi';
import RevenueChart from './RevenueChart';
import './Dashboard.css';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response =  await axios.get(`${getBaseUrl()}/api/admin`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                })

                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []);

    if(loading) return <Loading/>

  return (
    <>
     <section className="dashboard-grid">
              <div className="stat-card">
                
                <div className="icon-container purple">
                <Link to="/dashboard/manage-books">
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  </Link>
                </div>
                
                <div>
                 
                    <span className="stat-value">{data?.totalBooks}</span>
                    <span className="stat-label">Products</span>
                  
                  
                </div>
                
              </div>
              
              <div className="stat-card">
                <div className="icon-container green">
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                   <Link to="/CostumerOrderDetail">
                   <span className="stat-value">${data?.totalSales}</span>
                   <span className="stat-label">Total Sales</span>
                   </Link>
                  
                </div>
              </div>
              <div className="stat-card">
              <Link to="/dashboard/CustomerOrderDetail" className="stat-card-link">
                
                 <div className="icon-container blue">
                  <MdIncompleteCircle className='icon'/>
                  </div>
                   <div>
                 <span className="stat-value">{data?.totalOrders}</span>
                  <span className="stat-label">Total Orders</span>
                 </div>
                
              </Link>
               </div>
               <div className="stat-card">
              <Link to="/dashboard/requestgetpage" className="stat-card-link">
                
                 <div className="icon-container blue">
                  <BiBookAdd className='icon'/>
                  </div>
                   <div>
                   <span>{data?.totalRequests}</span>

                  <span className="stat-label">Customer-Requested-Books</span>
                 </div>
                
              </Link>
               </div>
              
             
            </section>
            <section className="dashboard-detailed-grid">
              <div className="chart-container orders-chart">
                <div className="chart-header">The number of orders per month</div>
                <div className="chart-content">
                  <div className="chart-placeholder">
                    <RevenueChart />
                  </div>
                </div>
              </div>
              <div className="stat-card">
                <div className="icon-container yellow">
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon">
                    <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <div>
                  <span className="stat-value">02</span>
                  <span className="stat-label">Orders left</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="icon-container teal">
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="stat-value">139</span>
                  <span className="stat-label">Website visits (last day)</span>
                </div>
              </div>
              <div className="users-container">
                <div className="users-header">
                  <span>Users by average order</span>
                  <button type="button" className="sort-button" id="options-menu" aria-haspopup="true" aria-expanded="true">
                    Descending
                    <svg className="dropdown-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
    
                </div>
                <div className="users-list-container">
                  <ul className="users-list">
                    <li className="user-item">
                      <div className="user-avatar">
                        <img src="https://randomuser.me/api/portraits/women/82.jpg" alt="Annette Watson profile picture"/>
                      </div>
                      <span className="user-name">Annette Watson</span>
                      <span className="user-value">9.3</span>
                    </li>
                    <li className="user-item">
                      <div className="user-avatar">
                        <img src="https://randomuser.me/api/portraits/men/81.jpg" alt="Calvin Steward profile picture"/>
                      </div>
                      <span className="user-name">Calvin Steward</span>
                      <span className="user-value">8.9</span>
                    </li>
                    <li className="user-item">
                      <div className="user-avatar">
                        <img src="https://randomuser.me/api/portraits/men/80.jpg" alt="Ralph Richards profile picture"/>
                      </div>
                      <span className="user-name">Ralph Richards</span>
                      <span className="user-value">8.7</span>
                    </li>
                    <li className="user-item">
                      <div className="user-avatar">
                        <img src="https://randomuser.me/api/portraits/men/79.jpg" alt="Bernard Murphy profile picture"/>
                      </div>
                      <span className="user-name">Bernard Murphy</span>
                      <span className="user-value">8.2</span>
                    </li>
                    <li className="user-item">
                      <div className="user-avatar">
                        <img src="https://randomuser.me/api/portraits/women/78.jpg" alt="Arlene Robertson profile picture"/>
                      </div>
                      <span className="user-name">Arlene Robertson</span>
                      <span className="user-value">8.2</span>
                    </li>
                    <li className="user-item">
                      <div className="user-avatar">
                        <img src="https://randomuser.me/api/portraits/women/77.jpg" alt="Jane Lane profile picture"/>
                      </div>
                      <span className="user-name">Jane Lane</span>
                      <span className="user-value">8.1</span>
                    </li>
                    <li className="user-item">
                      <div className="user-avatar">
                        <img src="https://randomuser.me/api/portraits/men/76.jpg" alt="Pat Mckinney profile picture"/>
                      </div>
                      <span className="user-name">Pat Mckinney</span>
                      <span className="user-value">7.9</span>
                    </li>
                    <li className="user-item">
                      <div className="user-avatar">
                        <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Norman Walters profile picture"/>
                      </div>
                      <span className="user-name">Norman Walters</span>
                      <span className="user-value">7.7</span>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <div className="students-chart-container">
                <div className="chart-header">Students by type of studying</div>
                <div className="chart-content">
                  <div className="chart-placeholder">Chart</div>
                </div>
              </div> */}
              <div className="stat-card">
                <div className="icon-container red">
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
                <div>
                  <span className="stat-value">{data?.trendingBooks}</span>
                  <span className="percentage">(13%)</span>
                  <span className="stat-label">Trending Books in This Month</span>
                </div>
                
              </div>
            </section>
            <section className="footer-credits">
              <a href="#" className="credit-link purple">BookNest Website Created by Mr Vishal Kumar And Ayush Rana </a>
            </section>
    </>
  )
}

export default Dashboard