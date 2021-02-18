import React, { useState, useEffect, useContext } from 'react'
import "./categoryCard.scss"
import Moment from 'react-moment';
import { ThemeContext } from "../../context/contexts/themeContext"

interface Props {
    image: string
    details: string
    title: string
    count: number
    date: string


}

const CategoryCard: React.FC<Props> = ({ image, title, count, date, details }) => {
    const { dispatch: themeDispatch, themeData, } = useContext(ThemeContext);


    console.log("date", date)
    return (
        <>
            <div className={`category-card-${themeData.theme}`}>
                <div className="category-card-header">

                </div>
                <div className="category-card-title-container">
                    <div className="title-header">
                        <div className="image-container">
                            <img src={image} />
                        </div>

                        <span>/t/{title.charAt(0).toUpperCase() + title.slice(1)}</span>
                    </div>
                    <p>{details}</p>
                </div>
                <div className="bottom-header-container">
                    <div className="count-container">
                        <span>{count}</span>
                        <span>Threads</span>
                    </div>
                    <div className="date-container">
                        <span>Last Thread Posted</span><Moment fromNow className="date" style={{ fontSize: "13px" }}>{date}</Moment>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CategoryCard