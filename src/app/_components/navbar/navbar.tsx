import React from "react";
import Image from "next/image";
import logo from "../../../assets/screens/freshcart-logo.svg";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className=" bg-amber-50 py-6 mx-auto lg:w-[80%] rounded-2xl mt-3 md:w-[90%] sm:w-full ">
            <div className="flex flex-col lg:flex-row justify-between items-center pe-5">
                <div className="flex flex-col lg:flex-row text-center">
                    <div className="ms-5">
                        <Image src={logo} alt="Logo" />
                    </div>
                    <div>
                        <ul className=" ms-5 gap-3 flex flex-col lg:flex-row text-center text-gray-500 pt-1 ">
                            <li>
                                <Link href="/home">Home</Link>
                            </li>
                            <li>
                                <Link href="/cart">Cart</Link>
                            </li>
                            <li>
                                <Link href="/products">Products</Link>
                            </li>
                            <li>
                                <Link href="/categories">Categories</Link>
                            </li>
                            <li>
                                <Link href="/brands">Brands</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row me-5 md:me-0 ">
                    <div className="flex flex-column gap-2 pt-2 mx-auto">
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-tiktok"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-linkedin"></i>
                        <i className="fab fa-youtube"></i>
                    </div>
                    <div className="flex flex-col lg:flex-row text-center ms-5  gap-3 ">
                        <div>
                            <Link href="/login">Login</Link>
                        </div>
                        <div>

                            <Link href="/register">Register</Link>
                        </div>
                        <div>

                            <Link href="/logout">Logout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
