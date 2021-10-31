/**********************************************************/
/* Handle user accounts and accountsChanged, per EIP 1193 */
/**********************************************************/


ethereum
  .request({ method: 'eth_accounts' })
  .then(handleAccountsChanged)
  .catch((err) => {
    // Some unexpected error.
    // For backwards compatibility reasons, if no accounts are available,
    // eth_accounts will return an empty array.
    console.error(err);
  });
  
  
// Note that this event is emitted on page load.
// If the array of accounts is non-empty, you're already
// connected.
ethereum.on('accountsChanged', handleAccountsChanged)

// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged (accounts) {
    console.log("Account changed");
    console.log("Current address: " + currentAccount);

    if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.');
        currentAccount = "0x0";
    } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0]
        // Run any other necessary logic...
        console.log("New Address: " + currentAccount);
    } else {		
    }
}  
  
  
  
/***********************************/
/* Handle connecting, per EIP 1102 */
/***********************************/

// You should only attempt to connect in response to user interaction,
// such as a button click. Otherwise, you're popup-spamming the user
// like it's 1999.
// If you can't retrieve the user's account(s), you should encourage the user
// to initiate a connection attempt.
document.getElementById('btn-connect').addEventListener("click", connect);

function connect() {
	console.log("Connect button clicked");

	ethereum
    .request({ method: 'eth_requestAccounts' })
	//.then(function(result) {console.log(result)})
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
}