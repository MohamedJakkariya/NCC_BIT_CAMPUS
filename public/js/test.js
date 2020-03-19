function byYear() {
    let findYear = document.querySelector('#getYear');
    console.log(findYear);
  
    const allmembers = document.querySelectorAll('.member-year');
  
    allmembers.forEach(member => {
      if (findYear.value == member.textContent) {
        // get parent node
        member.parentElement.parentElement.parentElement.style.display = 'flex';
      } else {
        // get parent node
        member.parentElement.parentElement.parentElement.style.display = 'none';
      }
    });
  
    console.log(year);
  }
  