import {useRouter,useRedux} from '../../features/testing_helpers';
import RegistrationPage from './registrationPage';
import userEvent from "@testing-library/user-event";
import {render , screen , waitFor,fireEvent} from '@testing-library/react';

fetch = jest.fn()
window.alert = jest.fn()

beforeEach(()=>{
    fetch.mockClear();
    alert.mockClear();
})

test('check register page components rendered successfully',()=>{
    render(useRedux(useRouter(<RegistrationPage/>)));
    const email = screen.getByPlaceholderText(/email*/i);
    const name = screen.getByPlaceholderText(/name*/i);
    const password = screen.getByPlaceholderText("Password*");
    const confirmPassword = screen.getByPlaceholderText(/confirm password*/i);
    const registerbutton = screen.getByRole('button',{name:"Register"})
    const termscheck = screen.getByTestId('terms')
    expect(email).toBeInTheDocument()
    expect(name).toBeInTheDocument()
    expect(password).toBeInTheDocument()
    expect(confirmPassword).toBeInTheDocument()
    expect(registerbutton).toBeInTheDocument()
    expect(termscheck).toBeChecked()
})


test('check entering invalid data',async ()=>{
    render(useRedux(useRouter(<RegistrationPage/>)));
    const errormessage = 'all fields are mandatory';
    const email = screen.getByPlaceholderText(/email*/i);
    const name = screen.getByPlaceholderText(/name*/i);
    const password = screen.getByPlaceholderText("Password*");
    const confirmPassword = screen.getByPlaceholderText(/confirm password*/i);
    const registerbutton = screen.getByRole('button',{name:"Register"})
    const elements = [email,name,password,confirmPassword];
    var calls = 1;
    await registerbutton.click();
    expect(alert).toBeCalledTimes(calls);
    expect(alert).lastCalledWith(errormessage);
    for(var i =0;i<elements.length;i++){
        fireEvent.change(elements[i],{target: {value: ''}})
        for(var j =0;j<elements.length;j++){
            if(i===j){
                continue
            }
            await userEvent.type(elements[j],'anything');
            await registerbutton.click();
            calls += 1;
            expect(alert).toBeCalledTimes(calls);
            expect(alert).lastCalledWith(errormessage)
        }
    }
})

test('check password and confirm password doesn\'t match',async ()=>{
    render(useRedux(useRouter(<RegistrationPage/>)));
    const errormessage = 'password and confirmPassword doesn\'t match';
    const email = screen.getByPlaceholderText(/email*/i);
    const name = screen.getByPlaceholderText(/name*/i);
    const password = screen.getByPlaceholderText("Password*");
    const confirmPassword = screen.getByPlaceholderText(/confirm password*/i);
    const registerbutton = screen.getByRole('button',{name:"Register"})
    const elements = [email,name,password,confirmPassword];
    for(var i =0;i<elements.length;i++){
        fireEvent.change(elements[i],{target: {value: 'anything'+i}})
    }
    await userEvent.click(registerbutton);
    expect(alert).toBeCalledTimes(1);
    expect(alert).lastCalledWith(errormessage);
})


test('create account with valid data',async ()=>{
    fetch.mockImplementationOnce(()=>{
        return Promise.resolve({
            ok:true
        })
    })
    render(useRedux(useRouter(<RegistrationPage/>)));
    const message = "account created succesfully";
    const email = screen.getByPlaceholderText(/email*/i);
    const name = screen.getByPlaceholderText(/name*/i);
    const password = screen.getByPlaceholderText("Password*");
    const confirmPassword = screen.getByPlaceholderText(/confirm password*/i);
    const registerbutton = screen.getByRole('button',{name:"Register"});
    await userEvent.type(email,'ahmed@example.com');
    await userEvent.type(name,'ahmed');
    await userEvent.type(password,'ahmed');
    await userEvent.type(confirmPassword,'ahmed');
    await userEvent.click(registerbutton);
    expect(alert).toBeCalledTimes(1);
    expect(alert).toBeCalledWith(message);
})


test('terms is not accepted',async ()=>{
    render(useRedux(useRouter(<RegistrationPage/>)));
    const message = "You need to agree on terms and conditions";
    const termscheck = screen.getByTestId('terms');
    const registerbutton = screen.getByRole('button',{name:"Register"});
    await userEvent.click(termscheck);
    await userEvent.click(registerbutton);
    expect(alert).toBeCalledTimes(1);
    expect(alert).toBeCalledWith(message);
})