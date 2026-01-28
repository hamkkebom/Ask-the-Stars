

async function createProject() {
  try {
    console.log('Starting project creation verification...');

    // 1. Login
    console.log('Authenticating...');
    const loginRes = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test_browser_retry_1@example.com',
        password: 'password123'
      })
    });

    if (!loginRes.ok) {
        throw new Error(`Login failed: ${loginRes.status} ${loginRes.statusText}`);
    }

    const loginData = await loginRes.json();
    const token = loginData.access_token;
    console.log('Login successful, token obtained.');

    // 2. Create Project Request
    console.log('Creating project...');
    const projectData = {
      title: 'Script Created Project ' + Date.now(),
      description: 'Created via verification script.',
      categories: ['Video', 'Test'],
      deadline: '2025-12-31T00:00:00.000Z',
      estimatedBudget: 500000,
      maxAssignees: 3,
      assignmentType: 'MULTIPLE'
    };

    const createRes = await fetch('http://localhost:4000/api/projects/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(projectData)
    });

    if (!createRes.ok) {
        const errText = await createRes.text();
        throw new Error(`Create Project failed: ${createRes.status} ${createRes.statusText} - ${errText}`);
    }

    const createdProject = await createRes.json();
    console.log('Project Created Successfully!');
    console.log('Project ID:', createdProject.id);

  } catch (error) {
    console.error('Verification Failed:', error.message);
    process.exit(1);
  }
}

createProject();

