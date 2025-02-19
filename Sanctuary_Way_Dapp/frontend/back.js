document.getElementById('transferForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const recipient = document.getElementById('recipient').value;
    const amount = document.getElementById('amount').value;

    try {
        const response = await fetch('http://127.0.0.1:5500/frontend/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipient, amount }),
        });

        const data = await response.json();
        if (data.success) {
            alert('Tokens transferred successfully!');
            // Update UI with additional information
            displayTokenInformation();
            document.getElementById('recipient').value = '';
            document.getElementById('amount').value = '';
        } else {
            alert('Error transferring tokens.');
        }
    } catch (error) {
        console.error('Error transferring tokens:', error);
        alert('Error transferring tokens. Please try again later.');
    }
});

const displayTokenInformation = async () => {
    try {
        const response = await fetch('http://localhost:3000/token-info');
        const data = await response.json();

        if (data.success) {
            document.getElementById('admin').textContent = data.admin;
            document.getElementById('allowance').textContent = data.allowance;
            document.getElementById('balance').textContent = data.balance;
            document.getElementById('contract').textContent = data.contract;
        } else {
            alert('Error fetching token information.');
        }
    } catch (error) {
        console.error('Error fetching token information:', error);
        alert('Error fetching token information. Please try again later.');
    }
}

// Initial call to display token information when the page loads
displayTokenInformation();


document.getElementById('transferForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission
  
    // Show loading spinner
    const btnSubmit = document.querySelector('.btn-submit');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    btnText.style.display = 'none';
    btnLoader.style.display = 'block';
  
    // Simulate a transaction (replace with actual Soroban contract call)
    setTimeout(() => {
      // Hide loading spinner
      btnText.style.display = 'inline';
      btnLoader.style.display = 'none';
  
      // Simulate success or failure (replace with actual logic)
      const isSuccess = Math.random() > 0.5; // Randomly decide success or failure
  
      if (isSuccess) {
        // Show success message
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
  
        // Clear form fields
        document.getElementById('recipient').value = '';
        document.getElementById('amount').value = '';
  
        // Hide success message after 3 seconds
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 3000);
      } else {
        // Show failure message
        const failureMessage = document.getElementById('failureMessage');
        failureMessage.style.display = 'block';
  
        // Hide failure message after 3 seconds
        setTimeout(() => {
          failureMessage.style.display = 'none';
        }, 3000);
      }
    }, 2000); // Simulate a 2-second delay for the transaction
  });
