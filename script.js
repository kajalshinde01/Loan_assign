function validateFullName(name) {
  const regex = /^[A-Za-z ]+$/; // Only allows alphabets and spaces
  const words = name.trim().split(/\s+/); // Split by one or more spaces
  return regex.test(name) && words.length >= 2 && words.every(word => word.length >= 4);
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePAN(pan) {
  const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;// Alphanumeric & Must be in this order and format: ABCDE1234F 
  
  return regex.test(pan);
}

function convertAmountToWords() {
  const amount = document.getElementById('loanAmount').value;
  const amountInWordsElement = document.getElementById('amountInWords');

  if (!isNaN(amount) && amount !== "") {
      const num = parseInt(amount);
      if (num <= 999999999) {
          amountInWordsElement.textContent = numberToWords(num);
      } else {
          amountInWordsElement.textContent = "";
      }
  } else {
      amountInWordsElement.textContent = "";
  }

}
function numberToWords(num) {
  const a = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
  const b = ['', '', 'Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
  const c = ['Thousand', 'Million', 'Billion', 'Trillion'];

  if ((num = num.toString()).length > 9)
     {
       return 'overflow';
     }
    
  let n = ('000000000' + num).substring(-9).match(/^(\d{2})(\d{2})(\d{3})(\d{3})$/);
  if (!n) 
    {
      return ;

    }
   var str = '';
  str = str + (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
  str = str + (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
  str = str + (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
  str = str + (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + ' ' : '';
   return str.trim();
}


document.getElementById('loanForm').addEventListener('submit',(event)=> {
  event.preventDefault();
  
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const pan = document.getElementById('pan').value;
  const loanAmount = document.getElementById('loanAmount').value;
  
  let valid = true;

  if (!validateFullName(fullName)) {
      document.getElementById('nameError').textContent = "Invalid full name. Each word must be at least 4 characters long and there must be at least two words.";
      valid = false;
  } else {
      document.getElementById('nameError').textContent = "";
  }
  
  if (!validateEmail(email)) {
      document.getElementById('emailError').textContent = "Invalid email format.";
      valid = false;
  } else {
      document.getElementById('emailError').textContent = "";
  }

  if (!validatePAN(pan)) {
      document.getElementById('panError').textContent = "Invalid PAN format. Must be in the format ABCDE1234F.";
      valid = false;
  } else {
      document.getElementById('panError').textContent = "";
  }

  if (isNaN(loanAmount) || loanAmount === "" || loanAmount > 999999999) {
      document.getElementById('amountError').textContent = "Invalid loan amount. It Must be numeric and up to 9 digits.";
      valid = false;
  } else {
      document.getElementById('amountError').textContent = "";
  }
  
  if (valid) {
      // Store form values in local storage for retrieval on the confirmation page
      localStorage.setItem('fullName', fullName);
      localStorage.setItem('email', email);
      localStorage.setItem('pan', pan);
      localStorage.setItem('loanAmount', loanAmount);

      window.location.href = 'confirm.html';
      alert("Loan form Successfully submited");
  }
});


