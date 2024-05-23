import React, { useEffect } from 'react';
import { BsChatRightDotsFill } from 'react-icons/bs';
import { HiAcademicCap, HiArchiveBoxXMark, HiChartBar, HiHome, HiMiniAdjustmentsHorizontal, HiMiniCalculator, HiMiniUsers, HiOutlineFolder, HiUsers } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Users = () => {
    const adminToken = localStorage.getItem("adminToken");
    const [activeRoute, setActiveRoute] = useState("Home")
    const authToken = localStorage.getItem("userToken");
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:5000/api/v1/admin/all_users`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${adminToken}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to all users');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (adminToken) {
            fetchProducts();
        }

    }, [adminToken]);

    console.log(users);
    return (
        <div>




        </div>
    );
};

export default Users;
