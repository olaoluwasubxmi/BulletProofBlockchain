document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const gunId = document.getElementById('registerGunId').value;
    const ownerId = document.getElementById('registerOwnerId').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            gun_id: gunId,
            owner_id: ownerId
        })
    });

    const data = await response.json();

    if (response.ok) {
        document.getElementById('message').textContent = `Gun registered successfully. Block hash: ${data.blockHash}`;
    } else {
        document.getElementById('message').textContent = data.message;
    }
});

document.getElementById('verifyForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const hash = document.getElementById('verifyHash').value;

    const response = await fetch(`/verify?hash=${hash}`);
    const data = await response.json();

    if (response.ok) {
        document.getElementById('message').textContent = `Owner ID: ${data.owner_id}`;
    } else {
        document.getElementById('message').textContent = data.message;
    }
});
