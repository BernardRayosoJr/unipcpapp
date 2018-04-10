import React, { Component } from 'react';
import './css/style.css';
import { Header, Logo, NavigationBar, AlertWarning, PageHeaderTitle, } from './component/index';
import {  Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import axios from 'axios';

import { Row, 
         Col,
         Alert,
         Modal,
       
         Grid,
         Form,
         FormControl,
         Button,
         PageHeader,
         FormGroup,
         ControlLabel,

         
         HelpBlock, } from 'react-bootstrap';

        // URL FOR API's
         const URL_SPONSOR_VERIFY = 'https://hydra.unicity.net/v5/customers?unicity=';
         const URL_ENROLLER_VERIFY = 'https://hydra.unicity.net/v5/customers?unicity=';
         const URL_UPLINE_VERIFY = '/uplineSponsoringCustomers.js?unicity=';
         const URL_TINID_VERIFY =  'https://hydra.unicity.net/v5/customers.js?_httpMethod=HEAD&mainAddress_country=PH&taxTerms_taxId=';

         // Array of Months
        
         var ArrMonths = [ "January", "February", "March", "April", "May", "June",
                           "July", "August", "September", "October", "November", "December" ],
    
         CreateMonths = function(months) {
            return <option>{months}</option>;
         };

         var ArrProvince = ["Abra","Agusan del Norte","Agusan del Sur","Aklan","Albay","Antique","Apayao","Aurora","Basilan","Bataan","Batanes","Batangas","Benguet","Biliran","Bohol","Bukidnon","Bulacan","Cagayan","Camarines Norte","Camarines Sur","Camiguin","Capiz","Catanduanes","Cavite","Cebu","Compostela Valley","Cotabato","Davao del Norte","Davao del Sur","Davao Occidental","Davao Oriental","Dinagat Islands","Eastern Samar","Guimaras","Ifugao","Ilocos Norte","Ilocos Sur","Iloilo","Isabela","Kalinga","La Union","Laguna","Lanao del Norte","Lanao del Sur","Leyte","Maguindanao","Marinduque","Masbate","Pasig","Muntinlupa","Las Pinas","Paranaque","Taguig","Makati","Mandaluyong","Manila","San Juan","Marikina","Quezon City","Malabon","Novaliches","Caloocan","Valenzuela","Misamis Occidental","Misamis Oriental","Mountain Province","Negros Occidental","Negros Oriental","Northern Samar","Nueva Ecija","Nueva Vizcaya","Occidental Mindoro","Oriental Mindoro","Palawan","Pampanga","Pangasinan","Quezon","Quirino","Rizal","Romblon","Samar","Sarangani","Siquijor","Sorsogon","South Cotabato","Southern Leyte","Sultan Kudarat","Sulu","Surigao del Norte","Surigao del Sur","Tarlac","Tawi-Tawi","Zambales","Zamboanga del Norte","Zamboanga del Sur","Zamboanga Sibugay"],
        
         CreateProvince = function(province) {
          return <option>{province}</option>;
          };

         // Array of Day
         var ArrDay = [ 
         "1", "2", "3", "4", "5", "6",
         "7", "8", "9", "10", "11", "12",
         "13", "14", "15", "16", "17", "18",
         "19", "20", "21", "22", "23", "24", 
         "25", "26", "27", "28", "29", "30",
         '31'],

          CreateDays = function(days) {
          return <option>{days}</option>;
          };




var year_max = []
var today = new Date();
var minTime = new Date();
minTime.setTime(today.getTime() - 18*365*24*60*60*1000);

var maxTime = new Date();
maxTime.setTime(minTime.getTime() - 80*365*24*60*60*1000);


for(var i = maxTime.getFullYear(); i <= minTime.getFullYear(); i++)
{
  year_max.push(i);
  
}


var new_year = year_max.reverse(),
createDate = function(year) {
   return <option>{year}</option>;
}





         
      
class App extends Component {

  constructor(props, context) {
    super(props, context);

  this.verifyTINHandleClick = this.verifyTINHandlerClick.bind(this);
  this.handleHide = this.handleHide.bind(this);
  this.handleShow = this.handleShow.bind(this);

  
  // this.handleChangeEnroller = this.handleChangeEnroller.bind(this);
  // this.handleChangeSponsor = this.handleChangeSponsor.bind(this);


  this.state = {
    // isLoading: false,


    ba_number_sponsor: '',
    ba_number_enroller: '',
    BAFirstName : '',
    BALastName: '',
    BAGender: '',
    BABday: '',
    BAAddress1: '',
    BAAddress2: '',
    BACity: '',
    BACountry: '',
    BAZipCode: '',
    ba_tinID: '',
    BAEmaiID: '',
    BAMobile: '',
    BAHomePhone: '',
    BAPassword: '',



    show: false,

    sponsor: '',
    enroller: '',
    isVerifySponsor: false,
    sponsorHref: '',
    
    validation: {
      sponsor: false,
      enroller: false,
      id_card: false
    },

    // Button State

    btnSubmit: {
      isLoading: false,
      default: "Verify Enroller / Sponsor",
      loading: "Verifying...",
      colorstyle: 'primary',
    },

    btnSubmitData: {
      isLoading: false,
      default: "Enroll Now",
      loading: "Verifying data...",
      colorstyle: 'primary',
    },

    enrollerText : {
      disabled : false,
      valid: 'error',
      errorText: ''
    },
    sponsorText: {
      disabled: false,
      valid: 'error',
      errorText: ''
    },
    errText: [],
    formError: 'hide',





    firstNameInput: {
      value: "",
      errorText: "",
      valid: false,
      disabled: false
    },

    
    lastNameText:  {
      disabled : false,
      value: "",
      errorText: "",
      valid: null,
      help: ''
    },

    genderText:  {
      disabled : false,
      value: "",
      errorText: "",
      valid: false,
    },
    
    birthdayText:  {
      disabled : false,
      value: "",
      errorText: "",
      valid: null,
    },

    address1Input : {
      disabled : false,
      value: "",
      errorText: "",
      valid: null,
    },

    address2Input : {
      disabled : false,
      value: "",
      errorText: "",
      valid: null,
    },


    birthdayMonth:  {
      disabled : false,
      value: "",
      errorText: "",
      valid: false,
    },
    birthdayYear:  {
      disabled : false,
      value: "",
      errorText: "",
      valid: false,
    },


    TinInput: {
      valid: null,
      value: "",
      errorText: "",
      disabled: false
    },

    

    zipInput: {
      value: "",
      errorText: "",
      valid: false,
      disabled: false
    },



    emailInput: {
      value: "",
      valid: false,
      disabled: false,
      errorText: ''
    },

    mobileTextInput:  {
      disabled : false,
      value: "",
      errorText: "",
      valid: null,
      help: ''
    },

    phoneTextInput:  {
      disabled : false,
      value: "",
      errorText: "",
      valid: null,
      help: ''
    },

    passwordTextInput:  {
      disabled : false,
      value: "",
      errorText: "",
      valid: null,
      help: ''
    },



    btnSubmitTin: {
      isLoading: false,
      default: "Verify ID",
      loading: "Verifying...",
      colorstyle: "primary",
      
    },


    displaySectionA: false,
    displaySectionB: 'hide'
  };
  
 }

 
   handleShow = () => {
    this.setState(prevState => {
      return {
        show: true
      }
    })
  }

  handleHide = () => {


    this.setState(prevState => {
      return {
        show: false
      }
    })

}

//  Verify Enroller 
verifyEnroller = () => {

  console.log("enroller",this.state.ba_number_enroller)
if (this.state.ba_number_enroller !== '')
{



  axios({
    method: 'get',
    url: URL_ENROLLER_VERIFY + this.state.ba_number_enroller + '&expand=customer',
    headers: {
      'Accept' : 'application/json',
      'Access-Control-Allow-Origin' : '*'
    },
    responseType : 'json',
  })
  .then(json => {

    console.log(json.data);
    console.log(json.status);
    console.log(json.statusText);

    if(json.status === 200) {

      this.setState(prevState => {

        return {
          enroller: json.data.items[0].humanName.fullName,
          sponsorHref: json.data.items[0].href,
          btnSubmit: {
            ...prevState.btnSubmit,
            isLoading: true,
          }
        }
      })
      this.verifySponsor();
    }
         
            
          
      })
      // .catch(err => {
      //   console.log(err);

      //   {this.state.enroller}
      //   this.setState(prevState => {

      //     return {
      //       ...prevState.enroller,
      //       enroller: "Invalid Enroller ID",
      //       btnSubmit: {
      //         ...prevState.btnSubmit,
      //         isLoading: false,
      //         colorstyle: "danger",
      //         default: "Try Again!",
              
      //       }
      //     }
      //   });
      // })
}

else {

  this.setState(prevState => {

    return {
      ...prevState.enroller,
      enroller: "Invalid Enroller ID",
      btnSubmit: {
        ...prevState.btnSubmit,
        isLoading: false,
        colorstyle: "danger",
        default: "Try Again!",
        
      }
    }
  });

}



}



//  Verify Sponsor 
verifySponsor = () => {

  console.log("Sponsor",this.state.ba_number_sponsor)

        

  // fetch(URL_SPONSOR_VERIFY + this.state.ba_number_sponsor + '&expand=customer',{
  //   method: 'GET',
  //         headers: {
  //           'Accept' : 'application/json'
  //         },
  //         dataType : 'json',

  // })
  // .then(response => {
  //   if(response.ok) {
  //       return response.json();
  //   }
  //   else {
  //     { throw response }
  //   }
  // })

  axios({
    method: 'get',
    url: URL_SPONSOR_VERIFY + this.state.ba_number_sponsor + '&expand=customer',
    headers: {
      'Accept' : 'application/json',
      'Access-Control-Allow-Origin' : '*'
    },
    responseType : 'json',
  })

  .then(json => {

    if (json.status === 200) {
      
      
      this.setState( prevState =>{
        return {
          sponsor: json.data.items[0].humanName.fullName,
            btnSubmit: {
              ...prevState.btnSubmit,
              isLoading: true,
            }
        }
        
      })
      this.verifyUpline();
    }

      
    
}) 
// .catch(err => {
//     console.log(err);
  
//     this.setState(prevState => {
//       return {
//         ...prevState.sponsor,
//         sponsor: "Invalid Sponsor ID",
//         btnSubmit: {
//           ...prevState.btnSubmit,
//           isLoading: false,
//           colorstyle: "danger",
//           default: "Try Again!",
          
//         }
//       }
//     });
//   })

}



//  Verify Enroller / Sponsor HandlerClick

 verifyEnrollerHandlerClick = (event) => {
  event.preventDefault();

  this.setState(prevState => {
    return {
      ba_number_enroller: this.inputEnrollerID.value,
      ba_number_sponsor: this.inputSponsorID.value,
      btnSubmit: {
        ...prevState.btnSubmit,
        isLoading: true,
      }
    };
});

  // This probably where you would have an `ajax` call
  setTimeout(() => {

    if (this.state.ba_number_enroller === this.state.ba_number_sponsor ) { 
      console.log('verifyEnroller',this.state.ba_number_enroller)

      this.setState(prevState => {
        return {
    
          btnSubmit: {
            ...prevState.btnSubmit,
            isLoading: false,
            colorstyle: 'primary',
            default: "Verifying..."
          }
        };
    });


      this.verifyEnroller();
    }

  else  if (!this.state.ba_number_enroller === '' && !this.state.ba_number_sponsor === '') {
     
      
      console.log('verifyEnroller',this.state.ba_number_enroller)
    }

    else {


      this.setState(prevState => {
        return {
    
          btnSubmit: {
            ...prevState.btnSubmit,
            isLoading: false,
            colorstyle: 'danger',
            default: "Try Again"
          }
        };
    });


      if (this.state.ba_number_enroller === '') {

        this.setState(prevState => {
          return {
      
            enrollerText: {
              ...prevState.enrollerText,
              isLoading: false,
              valid: 'error',
              errorText: "Please Enter a valid Enroller ID"
            }
          };
      });
      }
      

      if (this.state.ba_number_sponsor === '') {

        this.setState(prevState => {
          return {
      
            sponsorText: {
              ...prevState.sponsorText,
              isLoading: false,
              valid: 'error',
              errorText: "Please Enter a valid Sponsor ID"
            }
          };
      });
      }
    }
    
    console.log(this.state.sponsor)
  }, 1000);
}


//  EnrollmentClickHandler

 submitEnrollmentHandlerClick = (event) => {
  event.preventDefault();

  this.setState(prevState => {
    return {
      
      btnSubmitData: {
        ...prevState.btnSubmitData,
        isLoading: true,
      }
    };
});


  // console.log(this.state.emailInput);

  // if (this.state.emailInput.value === '' || this.state.emailInput.value === null ) {

  //   this.setState(prevState =>{
  //     return {
  //       emailInput: {
  //         ...prevState.emailInput,
  //         errorText:'Required / Please enter a valid Email Address!',

  //       }
  //     }
  //    })
  // }



  


  // if (this.inputLastName.value === '' || this.inputLastName.value === null ) {

  //   this.setState(prevState =>{
  //     return {
  //       lastNameText: {
  //         ...prevState.lastNameText,
  //         valid:'error',          
  //         help:'Required / Please enter a valid Last Name!',

  //       }
  //     }
  //    })
  // }

  // else {

  //   this.setState(prevState =>{
  //     return {
  //       lastNameText: {
  //         ...prevState.lastNameText,
  //         valid:'success',          
  //         help:'',

  //       }
  //     }
  //    });
  // }

 

  // if (!this.inputMonth.value &&  !this.inputDay.value && !this.inputYear.value) {

  //   this.setState(prevState =>{
  //     return {
  //       birthdayText: {
  //         ...prevState.birthdayText,
  //         valid:'error',          
  //         help:'Required / Please enter a valid Birthday!',

  //       }
  //     }
  //    })
  // }

  // else {

  //   this.setState(prevState =>{
  //     return {
  //       birthdayText: {
  //         ...prevState.birthdayText,
  //         valid:'success',          
  //         help:'Required / Please enter a valid Birthday!',

  //       }
  //     }
  //    });
  // }


  
  



  // This probably where you would have an `ajax` call
  setTimeout(() => {
    this.setState(prevState => {
      return {
        BAFirstName : this.firstNameInput.value,
        BALastName: this.lastNameText.value,
        BAGender: this.inputGender.value,
        BABday: this.inputMonth.value + this.inputDay.value + this.inputYear.value,
        BAAddress1: this.inputAddress1.value,
        BAAddress2: this.inputAddress2.value,
        BACity: this.inputCity.value,
        BACountry: this.inputCountry.value,
        BAZipCode: this.zipInput.value,
        ba_tinID: this.inputTINID.value,
        BAEmaiID: this.emailInput.value,
        BAMobile: this.mobileInput.value,
        BAHomePhone: this.phoneInput.value,
        BAPassword: this.passwordInput.value,
      }
        
  
     })

      
  console.log("FirstName: ------> ",this.state.BAFirstName)
  console.log("LastName: ------>",this.state.BALastName)
  console.log("Gender: ------>",this.state.BAGender)
  console.log("BirthDay: ------> ",this.state.BABday)
  console.log("BAEmaiID: ------> ",this.state.BAEmaiID)
  


  console.log("Country: ------> ",this.state.BACountry)
  console.log("Zipcode: ------>",this.state.BAZipCode)
  console.log("Address1: ------>",this.state.BAAddress1)
  console.log("Address2: ------>",this.state.BAAddress2)

  console.log("City: ------> ",this.state.BACity)
  console.log("Phone: ------>",this.state.BAHomePhone)
  console.log("Mobile: ------>",this.state.BAMobile)
  console.log("Password: ------>",this.state.BAPassword)

  console.log("shippingMethod: ------>",this.inputShippingMethod.value)

  this.validateData()
  
   
  }, 500);
}





newData = (dataValidate) => {

  return  axios.post('https://member-calls.unicity.com/PHL/PHL_Enroll_Validation.asp',
  dataValidate)
  .then(response => {

    if(response.status === 200) {
 
      if (response.data.Message.length > 0) {
        this.setState(prevState =>{
          return {
            errText: response.data.Message,
            formError: '',
            btnSubmitData: {
              ...prevState.btnSubmitData,
              isLoading: false,
              colorstyle: 'danger',
              default: 'Try Again!'
            }
          }
         })
      this.handleShow() 
      }
      else {


        this.setState(prevState =>{
          return {
            errText: response.data.Message,
            formError: '',
            btnSubmitData: {
              ...prevState.btnSubmitData,
              isLoading: false,
              colorstyle: 'success',
              default: 'Data Verified!'
            }
          }
         })


      }
       
  
      return response;

    }

    
    else {
      this.setState(prevState=> {
        return {
          btnSubmitData: {
            ...prevState.btnSubmitData,
            isLoading: false,
            colorstyle: 'success',
            default: 'Enroll!'
          }
        }
      })

      { throw response }
    }

  

  })
  .catch(err => {
    console.log("err",err);
  })
  
}

renderFormError() {


  return this.state.errText.map(errMsg =>
    
   <p><strong> {errMsg} </strong></p>
  );


  
  }

validateData = () => {

        var qs = require('qs');

          const dataValidate = qs.stringify({
                language:'English',
                firstName:this.state.BAFirstName,
                lastName:this.state.BALastName,
                gender:this.state.BAGender,
                birthDate:'1986-01-27',
                address1:this.state.BAAddress1,
                address2:this.state.BAAddress2,
                city:this.state.BACity,
                country:'PH',
                zip:this.state.BAZipCode,
                email:this.state.BAEmaiID,
                mobilePhone:this.state.BAMobile,
                homePhone:this.state.BAHomePhone,
                password:this.state.BAPassword
          
          });

         
this.newData(dataValidate)

 
}
//  Verify TIN FUNCTION


verifyTin = () => {

  console.log(this.state.ba_tinID)
  fetch(URL_TINID_VERIFY + this.state.ba_tinID,{
    method: 'GET',
  
  })
  .then(response => response.json())
  .then(json => {
   
  var dataSet = JSON.stringify(json.meta, undefined, 4);
  var newdataSet = dataSet.replace(/-/g, "");
  var obj = JSON.parse(newdataSet);

    if (obj.XStatusCode === '200') {
     

          this.setState(prevState => {

            return {
              btnSubmitTin: {
                ...prevState.btnSubmitTin,
                isLoading: false,
                default: "Try Again",
                loading: "Try Again...",
                colorstyle: "danger",
              },
              TinInput: {
                ...prevState.TinInput,
                errorText: "TIN ID Already Taken!",
                valid: 'error'
              }
            } 
          }) 
        }


    else if (obj.XStatusCode === '404') {
          console.log("TIN verified")
          this.setState(prevState => {

            return {
              TinInput: {
                ...prevState.TinInput,
                disabled: true,
                valid: 'success'
              },
              btnSubmitTin: {
                ...prevState.btnSubmitTin,
                isLoading: true,
                loading: "TIN ID Verified!",
                colorstyle: "success",
              },
              displaySectionB: '',
              
            } 
          }) 
          this.animateToThird();
      }

   else {
      console.log("Cannot verified Please try again!")

      this.setState(prevState => {

        return {
          btnSubmitTin: {
            ...prevState.btnSubmitTin,
            isLoading: false,
            default: "Try Again",
            loading: "Try Again...",
            colorstyle: "danger",
          },
          TinInput: {
            ...prevState.TinInput,
            errorText: "Cannot verified ID Please try again!"
          }
        } 
      }) 

   }
  })
  .catch(err => { 
    console.log(err)
  })

  
  this.setState(prevState => {
          return {
              btnSubmitTin: {
                ...prevState.btnSubmitTin,
                isLoading: true,
              }
          };
      });
 console.log("verifyTINHandlerClick");

  // This probably where you would have an `ajax` call
 setTimeout(() => {
      // Completed of async action, set loading state back

      console.log("verifyTINHandleClick Success!");
  }, 1000);
  
}

//  Verify TIN HandlerClick



verifyTINHandlerClick = (event) => {
  event.preventDefault();
 
  this.setState(prevState => {
    return {
      ba_tinID: this.inputTINID.value,
      btnSubmitTin: {
        ...prevState.btnSubmitTin,
        isLoading: true,
        
      }
    };
});


 // This probably where you would have an `ajax` call
 setTimeout(() => {
  this.verifyTin();
  

  console.log(this.state.sponsor)
}, 1000);

  
}

// verifyUpline

verifyUpline = () => {

  fetch(this.state.sponsorHref+URL_UPLINE_VERIFY+this.state.ba_number_enroller,{
    method: 'GET',

  })
  .then(response => {
    if(response.ok) {
        return response.json();
    }
    else {
      { throw response }
    }
  })
  .then(result => {

    if (this.state.ba_number_enroller === this.state.ba_number_sponsor) {
      
      this.setState(prevState => {

        return {
            validation : {
              sponsor: true,
              enroller: true
            },
            btnSubmit: {
              ...prevState.btnSubmit,
              isLoading:false,
              default: "Enroller / Sponsor Verified",
              colorstyle: "success",
            
            }
          }
         
      });

      this.validBANumber();

    }

    else {
      this.setState( prevState => {
     
        return {
          btnSubmit: {
            ...prevState.btnSubmit,
            default: "Please try again",
            loading: "Verifying...",
            colorstyle: 'danger',
            isDisable: false
          }
        }
       })
    }

    // console.log(result)
  })

  .catch(err => {
    console.log(err);
  
    this.setState(prevState => {
      return {
        btnSubmit: {
          ...prevState.btnSubmit,
          default: "Please try again",
          loading: "Verifying...",
          colorstyle: 'danger',
          isDisable: false
        } 
      }
    });

  
  })
  

}

animateView = () => {

  scroller.scrollTo('second-section', {
    duration: 900,
    delay: 0,
    smooth: 'easeInOutQuart'
  })
}

animateToThird = () => {

  scroller.scrollTo('third-section1', {
    duration: 900,
    delay: 0,
    smooth: 'easeInOutQuart'
  })
}

validBANumber = () => {

  if (this.state.validation.sponsor && this.state.validation.enroller) {
    console.log(this.state.validation.sponsor);
    console.log(this.state.validation.enroller);
    console.log("validNumber true")

 this.animateView();
 this.setState(prevState => {
   return {
     displaySectionA: true,
    
     sponsorText: {
      ...prevState.enrollerText,
       disabled: true,
       valid: 'success'

     },
     enrollerText: {
      ...prevState.enrollerText,
      disabled: true,
      valid: 'success'
     },
     btnSubmit: {
          ...prevState.btnSubmit,
          isLoading: true,
          loading: 'Enroller & Sponsor Verified'
        }
      };
  });
 }

 else {


  this.setState(prevState => {
    return {
      displaySectionA: true,
     
      sponsorText: {
       ...prevState.enrollerText,
        disabled: true,
        valid: 'error'
 
      },
      enrollerText: {
       ...prevState.enrollerText,
       disabled: true,
       valid: 'error'
      },
      btnSubmit: {
           ...prevState.btnSubmit,
           isLoading: true,
           loading: 'Try Again!'
         }
       };
   });

 
  }
}


getValidationMobile = () => {
  const length = this.state.mobileTextInput.value.length;
  if (length > 10 ) {
    return 'success';
  }
  else if (length >= 0 ) return 'error';
  return null;


}

getValidationPassword = () => {
  const length = this.state.passwordTextInput.value.length;
  if (length > 4 ) {
    return 'success';
  }
  else if (length >= 0 ) return 'error';
  return null;
}


getValidationZip = () => {
  const length = this.state.zipInput.value.length;
  if (length > 3 ) {
    return 'success';
  }
  else if (length >= 0 ) return 'error';
  return null;


}

getValidationEmail = () => {
  const email = this.state.emailInput.value;
  


  if(email !== "undefined"){
    let lastAtPos = email.lastIndexOf('@');
    let lastDotPos = email.lastIndexOf('.');


    if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {

      return 'error';
     }
      return 'success'
}

      return null;



}








// getValidationTIN = () => {
//   const length = this.state.TinInput.value.length;
  
//   return null;
// }


  
getValidationFirstName = (input) => {

  const length = input.value.length;
  if (length >= 1 ) {
    return 'success';
  }
  else if (length >= 0 ) return 'error';
  return null;
}

getValidationLastName = () => {
  const length = this.state.lastNameText.value.length;
  if (length >= 2 ) {
    return 'success';
  }
  else if (length >= 0 ) return 'error';
  return null;


}




handleChange = (e) => {
  const re = /^[0-9\b]+$/;
  const mailre = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  

  this.setState({ 
   [e.target.name]: e.target.value 
  });


  
  if (e.target.id === "taxID") {

   

    

    if (e.target.value === '' || re.test(e.target.value)) {
       this.setState({
          TinInput: {
            value: e.target.value
           }
        })  
      }

    

      
     
  }

  if (e.target.id === "emailID") {

  
    if (e.target.value === '' || mailre.test(e.target.value)) {
       this.setState({
          emailInput: {
            value: e.target.value,
           }
        })
      }
  }


  if (e.target.id === "zipID") {

    if (e.target.value === '' || re.test(e.target.value)) {
       this.setState({
          zipInput: {
            value: e.target.value
           }
        })
      }
  }

  if (e.target.id === "mobileID") {

    if (e.target.value === '' || re.test(e.target.value)) {
       this.setState({
        mobileTextInput: {
            value: e.target.value
           }
        })
      }
  }


  if (e.target.id === "passwordID") {
    this.setState({
      passwordTextInput: {
         value: e.target.value
        }
     })     
}

    
  if (e.target.id === "firstNameID") {
       this.setState({
        firstNameInput: {
            value: e.target.value
           }
        })     
  }

  if (e.target.id === "lastNameID") {

   

    this.setState({
     lastNameText: {
         value: e.target.value
        }
     })
   
}


  
  

  if (e.target.id === "address1ID") {

    if (e.target.value === '' ) {
       this.setState({
        address1Input: {
            value: e.target.value
           }
        })
      }
  }




}

componentWillUpdate(nextProps, nextState) {
  // console.log(nextState);

}

componentDidMount() {


  

}


render() {

    // const { isLoading } = this.state;
   
    let submitButton = (
      <Button 
             bsStyle={this.state.btnSubmit.colorstyle}
             disabled={this.state.btnSubmit.isLoading} 
             type="submit">  
             {this.state.btnSubmit.isLoading === true ? this.state.btnSubmit.loading : this.state.btnSubmit.default} 
      </Button>
      );

      let secondSection;
      if (this.state.displaySectionA) {
        
       secondSection = (
          <div>

          <PageHeader style={{textAlign:'left'}}>
          <Header/> 
          <small>Verification</small>
        </PageHeader>
        
        <form  onSubmit={this.verifyTINHandlerClick.bind(this) } > 
        
        <FieldGroup
          id="taxID"
          type="text"
          label="Taxpayer Identification (TIN):"

          disabled={this.state.TinInput.disabled}
          placeholder="9 Digit Number"
          validation = {this.state.TinInput.valid} 
          onChange={this.handleChange}
          inputRef={(input) => this.inputTINID = input}
          length="9"
          help={this.state.TinInput.errorText}
        />

        <Button 
              bsStyle={this.state.btnSubmitTin.colorstyle}
              disabled={this.state.TinInput.value.length < 9  || this.state.btnSubmitTin.isLoading } 
              type="submit" >  
              {this.state.btnSubmitTin.isLoading === true ? this.state.btnSubmitTin.loading : this.state.btnSubmitTin.default} 
        </Button>

        </form>  

        </div> 
        
        );
      
      }
      else 
      {
        secondSection = (
          <div className="hide">
            </div>
        )

      }
      

    return (

    <div className="App" >
          <Logo/>
          <NavigationBar/>
          <AlertWarning/>

     <Grid fluid>
   
    <PageHeaderTitle title={'Please fill in your Information'} small={'Verify Enroller'} />

    <div>



        <form onSubmit={this.verifyEnrollerHandlerClick.bind(this)} >

            <label className="sponsorLbl"> {this.state.enroller} </label>
            <FieldGroup
              id="enrollerID"
              type="text"
              label="Enroller ID:"
              placeholder="Enter Enroller ID"

              disabled={this.state.enrollerText.disabled}
              onChange={this.handleChange}
              inputRef={(input) => this.inputEnrollerID = input}
             
            
              validation={this.state.enrollerText.valid}
              help={this.state.enrollerText.errorText}
         
            />

              
          

            <label className="sponsorLbl" > {this.state.sponsor} </label>
              <FieldGroup
              id="sponsorID"
              type="text"
              disabled={this.state.sponsorText.disabled}
              label="Sponsor ID:"
              inputRef={(input) => this.inputSponsorID = input}
              placeholder="Enter Sponsor ID"
              onChange={this.handleChange}
              validation={this.state.sponsorText.valid}
              help={this.state.sponsorText.errorText}
            
            />
        
        {submitButton}
          </form>
      </div>

      <Element id='second-section' className="element" >

            {secondSection}

      </Element>
    

{/* // THIRD SECTION */}


    <Element id='third-section1' className="element" />

        <div className={this.state.displaySectionB}>

          <PageHeader style={{textAlign:'left'}}>
          <Header/> 
          <small>Personal Information</small>
        </PageHeader>

   <form  onSubmit={this.submitEnrollmentHandlerClick.bind(this)}>
  



  

     
    
      <FieldGroup
          id="firstNameID"
          type="text"
          label="First Name"
          placeholder="Enter First Name"
         
          disabled={this.state.firstNameInput.disabled}
          onChange={this.handleChange}
          inputRef={(input) => this.firstNameInput = input}
          validation = {this.getValidationFirstName(this.state.firstNameInput)}
        />





    <FieldGroup
      id="lastNameID"
      type="text"
      label="Last Name"
      placeholder="Enter Last Name"
      disabled={this.state.lastNameText.disabled}
      inputRef={(input) => this.lastNameText = input}
      onChange={this.handleChange}
      help={this.state.lastNameText.help}
      validation = {this.getValidationFirstName(this.state.lastNameText)}
      
    />

    <FormGroup>
      <ControlLabel>Gender</ControlLabel>
      <FormControl componentClass="select" 
      placeholder=""
      inputRef={(input) => this.inputGender = input}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </FormControl>
      
    </FormGroup>


     
     <FormGroup validationState="success" id="birthday" valid={this.state.birthdayText.valid} >
      
      <ControlLabel>Birthday</ControlLabel>
      <Row>
      <Col xs={4} md={4}>
      <FormControl
      id="bodDay"
      componentClass="select"
      placeholder="Day"
      inputRef={(input) => this.inputDay = input}
      >
        {ArrDay.map(CreateDays)}
      </FormControl>
      </Col>
     
        
      <Col xs={4} md={4}>
      <FormControl
      id="bodMonth"
      componentClass="select"
      placeholder="Month"
      inputRef={(input) => this.inputMonth = input}
      >
        
    {ArrMonths.map(CreateMonths)}
        
      </FormControl>
      </Col>

      <Col xs={4} md={4}>  
      <FormControl
       id="bodYear"
      componentClass="select"
      placeholder="Year"
      inputRef={(input) => this.inputYear = input}
      >
        {new_year.map(createDate)}
      </FormControl>
      </Col>
      </Row>
       <HelpBlock></HelpBlock>
    </FormGroup>
    
          <Alert bsStyle="warning" >
          <label> Applicant must be 18 years or older.</label>
          </Alert>


   
    <PageHeader style={{textAlign:'left'}}>
    <Header/> 
      <small>Contact Information</small>
    </PageHeader>

     <FieldGroup
      id="address1ID"
      type="text"
      label="Address Line 1"
      placeholder="House Number, Building and Street Name"
      disabled={this.state.address1Input.disabled}
      inputRef={(input) => this.inputAddress1 = input}
      onChange={this.handleChange}
      help={this.state.address1Input.errorText}
      //  validation={this.state.address1Input.getValidationFirstName()}
     
     

    />
    

    <FieldGroup
      id="address2ID"
      type="text"
      label="Address Line 2"
      placeholder="Brgy, Village, Subdivision"
      disabled={this.state.address2Input.disabled}
      inputRef={(input) => this.inputAddress2 = input}
      help={this.state.address2Input.errorText}
      validation={this.state.address2Input.valid}

    />

    

     <FieldGroup
      id="zipID"
      type="text"
      label="Postal Code"
      placeholder="4 Digit Number"
      disabled={this.state.zipInput.disabled}
      length="4"
      onChange={this.handleChange}
      inputRef={(input) => this.zipInput = input}
      validation = {this.getValidationZip()}   
    />


 <Row>
    <Col xs={6} md={6}>   

     <FieldGroup
      id="countryID"
      type="text"
      label="Country"
      classtype="select"
      placeholder="Country"
      inputRef={(input) => this.inputCountry = input}
    >
  <option value="PH">Philippines</option>
    </FieldGroup>

    </Col>

    <Col xs={6} md={6}>   
     <FieldGroup
      id="cityID"
      type="text"
      label="City / Municipality"
      classtype="select"
      placeholder="Enter City"
      inputRef={(input) => this.inputCity = input}
    >
    {ArrProvince.map(CreateProvince)}
    </FieldGroup>
    </Col>

</Row>

    
    <FieldGroup
      id="emailID"
      type="email"
      label="Email address"
      placeholder="Enter email"
      disabled={this.state.emailInput.disabled}
      validation = {this.getValidationEmail()}
      onChange={this.handleChange}
      inputRef={(input) => this.emailInput = input}
      help={this.state.emailInput.errorText}
    />

    <FieldGroup
      id="mobileID"
      type="text"
      length="11"
      label="Mobile Phone"
      placeholder="0900-000-0000"

      disabled={this.state.mobileTextInput.disabled}
     
      onChange={this.handleChange}
      validation = {this.getValidationMobile()}   

      inputRef={(input) => this.mobileInput = input}
      help={this.state.mobileTextInput.errorText}
    />

     <FieldGroup
      id="phoneID"
      type="text"
      label="Phone"
      placeholder="00-000-0000"
      disabled={this.state.phoneTextInput.disabled}
      validation={this.state.phoneTextInput.valid}
      onChange={this.handleChange}
      inputRef={(input) => this.phoneInput = input}
      help={this.state.phoneTextInput.errorText}
    />

    <FieldGroup
    id="passwordID"
    label="Password"
    placeholder="Enter Password"
    type="password"
    disabled={this.state.passwordTextInput.disabled}
    validation = {this.getValidationPassword()}  
    onChange={this.handleChange}
    inputRef={(input) => this.passwordInput = input}
    help={this.state.passwordTextInput.errorText}
    
    />

 


   <FieldGroup
      id="fcShippingMethod"
      label="Shipping Method"
      classtype="select"
      placeholder="Choose Pick up Locatio"
      inputRef={(input) => this.inputShippingMethod = input}
    >
        <option value="Ortigas">Pick up Ortigas</option>
        <option value="Taguig">Pick up Taguig</option>
        <option value="Delivery">Delivery</option>
    </FieldGroup>


           {/* <Alert bsStyle="danger" className={this.state.errText.length > 0 ? '' : 'hide'}>

            {this.renderFormError()}
          </Alert> */}

          {/* <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          Launch demo modal
        </Button> */}

          <Modal 
        
          
          {...this.props}
          container={this}

          show={this.state.show}
          onHide={this.handleHide}
          
          
          className="modalAlert"
          aria-labelledby="contained-modal-title-lg">
          <Modal.Header >
            <Modal.Title id="contained-modal-title-lg">Error validating</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            {this.renderFormError()}
          
          </Modal.Body>
          <Modal.Footer>
          <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
      </Modal>

    <Button 
             block
             bsStyle={this.state.btnSubmitData.colorstyle}
             disabled={this.state.btnSubmitData.isLoading} 
             type="submit">  
             {this.state.btnSubmitData.isLoading === true ? this.state.btnSubmitData.loading : this.state.btnSubmitData.default} 
      </Button>

  </form> 
  </div>




</Grid> 
        
          

</div>

    );
  }
}

function FieldGroup({ id, validation, classtype, label, length, help, inputRef, ...props }) {
  return (
    <FormGroup validationState={validation} controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props}
       maxLength={length}
       componentClass={classtype}
       inputRef={inputRef} />
        <FormControl.Feedback />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}




export default App;
