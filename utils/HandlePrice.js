export const HandlePrice = (product ,country) => {
    let currentPrice;
  
    switch (country) {
      case 'Turkey':
        currentPrice = product?.tprice ;
        break;

        case 'Saudi Arabia':
          currentPrice = product?.saudiprice ;
          break;
        
        //Saudi Arabia 
      case 'Kuwait':
        currentPrice = product?.omanprice;
        break;
      case 'Bahrain':
        currentPrice = product?.qatarprice;
        break;
        case 'Egypt':
          currentPrice = product?.egyptprice;
          break;
          case 'United Arab Emirates':
            currentPrice = product?.emiratesprice;
            break;
          //United Arab Emirates
          case 'Jordan':
            currentPrice = product?.jordanprice;
            break;
      default:
        currentPrice = product?.price;
    }
  
    return currentPrice;
  };


  export const HandleDolar = (dir ,country) => {
    let currentPrice;
  
    switch (country) {
      case 'Turkey':
        currentPrice = dir === 'rtl' ? 'ليرة نركي' : 'TL' ;
        break;

        case 'Saudi Arabia':
          currentPrice = dir === 'rtl' ? 'ريال سعودي' : 'SAR' ;
          break;
        //Saudi Arabia 
      // case 'Oman':
      //   currentPrice = dir === 'rtl' ? 'ريال عماني' : 'OMR' ;

        case 'Kuwait':
          currentPrice = dir === 'rtl' ? 'دينار كويتي' : 'KWD' ;
        break;
        case 'Bahrain':
          currentPrice = dir === 'rtl' ? 'دينار بحريني' : 'BHD' ;
      // case 'Qatar':
      //   currentPrice = dir === 'rtl' ? 'ريال قطري' : 'QAR' ;
        break;
        case 'Egypt':
          currentPrice = dir === 'rtl' ? 'جنيه مصري' : 'EGP' ;
          break;
          case 'United Arab Emirates':
            currentPrice = dir === 'rtl' ? 'درهم اماراتي' : 'AED' ;
            break;
          //United Arab Emirates
          case 'Jordan':
            currentPrice = dir === 'rtl' ? 'دينار اردني' : 'JOD' ;
            break;
      default:
        currentPrice = "$";
    }
  
    return currentPrice;
  };