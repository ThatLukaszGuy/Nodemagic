const inputEl = document.getElementById('date');
const submitBtn = document.getElementById('submit');
const redirBtn = document.getElementById('render');
const form = document.getElementById('time-form');
const answer = document.getElementById('answer-field');

form.addEventListener('submit', (e) => {
    e.preventDefault()
})



//render on page
submitBtn.addEventListener('click', () => {
    
    const date = inputEl.value;
    let inputDate;
    
    const checkEmpty = () => {
        if (!isNaN(date)) {
          inputDate = new Date(parseInt(date));
        } else {
          inputDate = new Date(date);
          inputEl.value = '';
          answer.innerHTML = `<ul>
                              <li class="list-item">Input: ${inputDate}; </li>

                              <li class="list-item">unix:  ${inputDate.getTime()}; </li>
          
                              <li class="list-item">UTC:   ${inputDate.toUTCString()}; </li>
                              
                              </ul>
          `
        }
      }

    if (!date) {
        inputDate = new Date();
        answer.innerHTML = `<ul>
        <li class="list-item">Input: ${inputDate}; </li>

        <li class="list-item">unix:  ${inputDate.getTime()}; </li>

        <li class="list-item">UTC:   ${inputDate.toUTCString()}; </li>
        
        </ul>
`
        
        

    } else {
        checkEmpty();
    }


})


//redirect

redirBtn.addEventListener('click', () => {
    const partHref = inputEl.value;
    if (inputEl.value == '') {
      inputDate = new Date(parseInt(date));
      window.location.href = `/time/${inputDate}`
    } else {
        const fullHref = partHref.replace(new RegExp('/','g') ,'-');
      
        window.location.href = `/time/${fullHref}`;
        
        inputEl.value = '';
    }
    

})