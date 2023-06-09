document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const gunId = document.getElementById('gun-id').value;
    const ownerId = document.getElementById('owner-id').value;
    
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            gun_id: gunId,
            owner_id: ownerId
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message && data.blockHash) {
                // Display the block hash on the page and enable the "Copy" button
                document.getElementById('block-hash-display').textContent = `Block Hash: ${data.blockHash}\nPlease do not share this with anyone.`;
                document.getElementById('copy-button').style.display = 'block';
            } else if (data.message) {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('verify-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const blockHash = document.getElementById('block-hash').value;
    
    fetch(`http://localhost:3000/verify?hash=${blockHash}`)
        .then(response => response.json())
        .then(data => {
            if (data.gun_id && data.owner_id) {
                alert(`Gun ID: ${data.gun_id}\nOwner ID: ${data.owner_id}`);
            } else {
                alert('Hash not found');
            }
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('transfer-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const gunId = document.getElementById('gun-id-transfer').value;
    const oldOwnerId = document.getElementById('old-owner-id').value;
    const newOwnerId = document.getElementById('new-owner-id').value;
    
    fetch('http://localhost:3000/transfer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            gun_id: gunId,
            old_owner_id: oldOwnerId,
            new_owner_id: newOwnerId
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message && data.blockHash) {
                alert(`${data.message}\nBlock Hash: ${data.blockHash}`);
            } else if (data.message) {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('copy-button').addEventListener('click', function(event) {
    const blockHash = document.getElementById('block-hash-display').textContent;
    navigator.clipboard.writeText(blockHash).then(() => {
        alert('Block Hash copied to clipboard!');
    });
});
