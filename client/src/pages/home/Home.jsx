import Collection from '../../components/collection/Collection';
import Main from '../../components/main/Main';
import Offers from '../../components/offers/Offers';
import Promo from '../../components/promo/Promo';
import Sale from '../../components/sale/Sale';
import './home.css';

export default function Home() {
  return (
    <>
        <Main/>
        <Offers />
        <Promo/>
        <Sale />
        <Promo />
        <Collection />
    </>
  )
}
