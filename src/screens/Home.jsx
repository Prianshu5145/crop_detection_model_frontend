import React from 'react';
import Navbar from '../components/Navbar.jsx'
import ImageSlider from '../components/ImageSlider.jsx';
import ButtonGrid from '../components/ButtonGrid';
// import Card from '../components/Cards.js'
import PosterSection from '../components/PosterSection.jsx'
import Footer from '../components/footer.jsx';

const Home = () => {
  return (
    <div>
   
      <Navbar/>
<ImageSlider/>
<ButtonGrid/>
 <PosterSection/>
      
     
      <Footer/> 
     
    </div>
  );
};

export default Home;
