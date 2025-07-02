import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
function SidebarCardAdmin() {
    return (
        <div className="h-full bg-[#1e293b]">
            <Sidebar breakPoint="md" backgroundColor="#1e293b">
                <Menu
                    menuItemStyles={{
                        button: {
                            [`&.active`]: {
                                backgroundColor: '#334155',
                                color: '#facc15',
                            },
                            color: '#e2e8f0',
                            '&:hover': {
                                backgroundColor: '#334155',
                                color: '#facc15',
                            }
                        },
                    }}
                >
                    <MenuItem component={<Link to="upload-pdf" />}>Upload News</MenuItem>
                    <MenuItem component={<Link to="/calendar" />}>Register</MenuItem>
                    <MenuItem component={<Link to="/e-commerce" />}>See Student</MenuItem>
                </Menu>
            </Sidebar>
        </div>
    );
}

export default SidebarCardAdmin;
