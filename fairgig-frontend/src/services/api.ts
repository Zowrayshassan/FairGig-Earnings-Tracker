const API_BASE_URLS = {
  auth: 'http://127.0.0.1:5001/api/auth',
  grievances: 'http://127.0.0.1:5002/api/grievances',
  earnings: 'http://127.0.0.1:8001/api/earnings',
  anomaly: 'http://127.0.0.1:8002/api/anomaly',
  analytics: 'http://127.0.0.1:8003/api/analytics',
  renderer: 'http://127.0.0.1:5003/api/render',
};

export const apiRequest = async (service: keyof typeof API_BASE_URLS, endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URLS[service]}${endpoint}`;
  let token = localStorage.getItem('token');

  const headers: any = {
    ...(token ? { 'x-auth-token': token } : {}),
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  let response = await fetch(url, { ...options, headers });
  
  // Auto-refresh logic (SOFTEC Compliance)
  if (response.status === 401 && localStorage.getItem('refreshToken')) {
    try {
        const refreshRes = await fetch(`${API_BASE_URLS.auth}/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') })
        });

        if (refreshRes.ok) {
            const { token: newToken } = await refreshRes.json();
            localStorage.setItem('token', newToken);
            // Retry original request
            headers['x-auth-token'] = newToken;
            response = await fetch(url, { ...options, headers });
        } else {
            // Refresh token expired or invalid
            localStorage.clear();
            window.location.href = '/login';
        }
    } catch (e) {
        localStorage.clear();
        window.location.href = '/login';
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    let msg = errorData.detail || errorData.msg || 'Something went wrong';
    if (typeof msg === 'object') msg = JSON.stringify(msg);
    throw new Error(msg);
  }

  return response.json();
};

export default API_BASE_URLS;
