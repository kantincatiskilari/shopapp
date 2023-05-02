import Card from '../card/Card';
import './sale.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Sale() {
    const [slider,setSlider] = useState(0);
    const [sales,setSales] = useState([]);

    useEffect(() => {
        const fetchSale = async () => {
            const res = await axios.get("/products/discount/limited");
            setSales(res.data)
        }
        fetchSale()
    },[]);
  return (
    <div className="sale">
        <h1 className="saleTitle">On Sale!</h1>
        <div className="saleContainer" style={{transform:`translateX(${slider * 430}px)`}}>
            {sales.map((sale) => (
                <Card key={sale._id} sale={sale} />
            ))}
        </div>
            <div className="saleSlider">
                <div className="saleSliderArrow" onClick={() => setSlider(slider !== sales.length - 4  ? slider + 1 : 0)}>
                    <KeyboardArrowLeftIcon/>
                </div>
                <div className="saleSliderArrow" onClick={() => setSlider(slider !== 4 - sales.length ? slider - 1 : 0)}>
                    <KeyboardArrowRightIcon />
                </div>
            </div>
    </div>
  )
}
