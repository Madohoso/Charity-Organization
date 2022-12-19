import {render , screen , waitFor} from '@testing-library/react'
import LoginPage from './loginPage';
import userEvent from "@testing-library/user-event";
import {useRouter,useRedux} from '../../features/testing_helpers'


global.fetch = jest.fn();
window.alert = jest.fn();

beforeEach(()=>{
    fetch.mockClear();
    alert.mockClear();
})

test('Login page is render with all Components Successfully',async ()=>{
    render(useRedux(useRouter(<LoginPage/>)));
    const usernameInput = await screen.findByPlaceholderText(/email or phone*/i);
    const passwordInput = await screen.findByPlaceholderText(/password/i);
    const keepmelogin = await screen.findByTestId("keepmelogin");
    const loginButton = await screen.findByTestId("login");
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(keepmelogin).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
});


test('login with not keep me login',async ()=>{
    render(useRedux(useRouter(<LoginPage/>)));
    fetch.mockImplementationOnce(() => Promise.resolve({
        ok:true,
        json: () => Promise.resolve( { access: 'aaa',refresh:'aaa',userId:'1' } ),
    }));
    const usernameInput = await screen.findByPlaceholderText(/email or phone*/i);
    const passwordInput = await screen.findByPlaceholderText(/password/i);
    const loginButton = await screen.findByTestId("login");
    await userEvent.type(usernameInput,"ahmed@yahoo.com")
    await userEvent.type(passwordInput,"ahmed")
    await userEvent.click(loginButton)
    await waitFor(()=>{expect(sessionStorage.getItem('refreshToken')).toEqual('aaa')}, {  timeout: 1000 });
});


test('login with keep me login set',async ()=>{
    render(useRedux(useRouter(<LoginPage/>)));
    fetch.mockImplementationOnce(() => Promise.resolve({
        ok:true,
        json: () => Promise.resolve( { access: 'aaa',refresh:'aaa',userId:'1' } ),
    }));
    const usernameInput = await screen.findByPlaceholderText(/email or phone*/i);
    const passwordInput = await screen.findByPlaceholderText(/password/i);
    const loginButton = await screen.findByTestId("login");
    const keepmelogin = await screen.findByTestId("keepmelogin");
    await userEvent.type(usernameInput,"ahmed@yahoo.com")
    await userEvent.type(passwordInput,"ahmed")
    await userEvent.click(keepmelogin)
    expect(keepmelogin).toBeChecked()
    await userEvent.click(loginButton)
    await waitFor(()=>{expect(localStorage.getItem('refreshToken')).toEqual('aaa')}, {  timeout: 1000 });
});

test('login with invalid credientials',async ()=>{
    render(useRedux(useRouter(<LoginPage/>)));
    fetch.mockImplementationOnce(() => Promise.resolve({
        ok:false,
        json: () => Promise.resolve( { data:'wrong credientials' } ),
    }));
    const usernameInput = await screen.findByPlaceholderText(/email or phone*/i);
    const passwordInput = await screen.findByPlaceholderText(/password/i);
    const loginButton = await screen.findByTestId("login");
    await userEvent.type(usernameInput,"ahmed@yahoo.com")
    await userEvent.type(passwordInput,"ahmed")
    await userEvent.click(loginButton)
    expect(alert).toBeCalledTimes(1);
})
