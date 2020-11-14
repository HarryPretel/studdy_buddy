import { render, screen } from '@testing-library/react';
import App from './App';
import Dashboard from './components/Dashboard';
import SignupForm from './components/SignupForm';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import CreateProfileForm from './components/CreateProfileForm';
import MessageForm from './components/MessageForm';
import Signup from './components/Signup';


test('Loading app', () => {
  render(<App />);
  const element = screen.getByText(/Welcome to Studdy Buddy/i);
  expect(element).toBeInTheDocument();
});

test('Test Dashboard', () => {
  render(<Dashboard />);
  const element = screen.getByText(/Dashboard/i);
  expect(element).toBeInTheDocument();
});

test('Test SignupForm', () => {
  render(<SignupForm />);
  const element = screen.getAllByText(/next/i);
  expect(element[0]).toBeInTheDocument();
});

test('Test Nav', () => {
  render(<Nav />);
  const element = screen.getByText(/StudyBuddy/i);
  expect(element).toBeInTheDocument();
});

test('Test LoginForm', () => {
  render(<LoginForm />);
  const element = screen.getAllByText(/Sign In/i);
  expect(element[0]).toBeInTheDocument();
});

// test('Test Index', () => {
//   render(<Index />);
//   const root = document.createElement('div');
//   root.setAttribute('id', 'root');
//   document.body.appendChild(root);
//   require('../index');
// });
