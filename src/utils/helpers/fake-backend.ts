export { fakeBackend };

interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
}

function fakeBackend() {
  const users: User[] = [
    {
      id: 1,
      username: 'info@codedthemes.com',
      password: 'admin123',
      firstName: 'Lucas Seabra',
      lastName: '.com',
      image: 'https://cdn.vuetifyjs.com/images/john-smirk.png'
    }
  ];
  const realFetch = window.fetch;

  window.fetch = function (url: string, opts: { method: string; headers: { [key: string]: string }; body?: string }) {
    return new Promise<Response>((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(handleRoute, 500);

      function handleRoute() {
        switch (true) {
          case url.endsWith('/users/authenticate') && opts.method === 'POST':
            return authenticate();
          case url.endsWith('/users') && opts.method === 'GET':
            return getUsers();
          case url.endsWith('/clients') && opts.method === 'GET':
            return getClients();
          default:
            // pass through any requests not handled above
            return realFetch(url, opts)
              .then((response) => resolve(response))
              .catch((error) => reject(error));
        }
      }

      // route functions
      function authenticate() {
        const { username, password } = body();
        const user = users.find((x) => x.username === username && x.password === password);
        if (!user) return error('Username or password is incorrect');
        return ok({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          token: 'fake-jwt-token',
          image: user.image
        });
      }

      function getUsers() {
        if (!isAuthenticated()) return unauthorized();
        return ok(users);
      }

      function getClients() {
        if (!isAuthenticated()) return unauthorized();
        const clients = [
          {
            number: 12343412,
            name: 'Aeroporto de Goiânia',
            address: 'Av. Castelo branco quadra 47 lote 01 - Goiânia',
            isOpen: false
          },
          {
            number: 12343412,
            name: 'Aeroporto de Goiânia',
            address: 'Av. Castelo branco quadra 47 lote 01 - Goiânia',
            isOpen: true
          },
          {
            number: 12343412,
            name: 'Aeroporto de Goiânia',
            address: 'Av. Castelo branco quadra 47 lote 01 - Goiânia',
            isOpen: true
          },
          {
            number: 12343412,
            name: 'Aeroporto de Goiânia',
            address: 'Av. Castelo branco quadra 47 lote 01 - Goiânia',
            isOpen: true
          },
          {
            number: 12343412,
            name: 'Aeroporto de Goiânia',
            address: 'Av. Castelo branco quadra 47 lote 01 - Goiânia',
            isOpen: false
          },
          {
            number: 12343412,
            name: 'Aeroporto de Goiânia',
            address: 'Av. Castelo branco quadra 47 lote 01 - Goiânia',
            isOpen: true
          }
        ];
        return ok(clients);
      }

      // helper functions
      function ok(body: Array<unknown> | object): void {
        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) } as Response);
      }

      function unauthorized() {
        resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) } as Response);
      }

      function error(message: string) {
        resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) } as Response);
      }

      function isAuthenticated() {
        return opts.headers['Authorization'] === 'Bearer fake-jwt-token';
      }

      function body() {
        return opts.body && JSON.parse(opts.body);
      }
    });
  } as typeof window.fetch; // Type assertion here
}
