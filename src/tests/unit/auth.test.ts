import api from '../../services/api/axiosInstance';
import { login } from '../../services/api/auth';

jest.mock('../../services/api/axiosInstance');

describe('auth service', () => {
  const mockedPost = api.post as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send login request and return tokens', async () => {
    const mockResponse = {
      data: {
        tokens: {
          access: 'access-token',
          refresh: 'refresh-token',
        },
      },
    };
    mockedPost.mockResolvedValueOnce(mockResponse);

    const result = await login('test@mail.com', '123456');

    expect(api.post).toHaveBeenCalledWith('/auth/login/', {
      email: 'test@mail.com',
      password: '123456',
    });
    expect(result).toEqual(mockResponse.data);
  });

  it('should throw error if login fails', async () => {
    mockedPost.mockRejectedValueOnce(new Error('401 - Unauthorized'));

    await expect(login('wrong@mail.com', 'wrongpass')).rejects.toThrow('401 - Unauthorized');
  });
});
