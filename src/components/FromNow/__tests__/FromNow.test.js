import React from 'react';
import i18next from 'Utils/i18next';
import { I18nextProvider } from "react-i18next";
import { render, getNodeText } from '@testing-library/react';

import FromNow from '../FromNow';

describe('<FromNow />', () => {
  it('should render time with text: 10 minutes', () => {
    const newDate = new Date();
    newDate.setMinutes(newDate.getMinutes() - 10);

    const { container } = render(
      <I18nextProvider i18n={i18next('https://test/')}>
        <FromNow
          timestamp={Math.floor(newDate.getTime() / 1000)}
        />
      </I18nextProvider>
    );

    expect(getNodeText(container.querySelector('time'))).toBe('10 minutes');
  });

  it('should render time with text: 10 hours', () => {
    const newDate = new Date();
    newDate.setHours(newDate.getHours() - 10);

    const { container } = render(
      <I18nextProvider i18n={i18next('https://test/')}>
        <FromNow
          timestamp={Math.floor(newDate.getTime() / 1000)}
        />
      </I18nextProvider>
    );

    expect(getNodeText(container.querySelector('time'))).toBe('10 hours');
  });

  it('should render time with text: 10 days', () => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - 10);

    const { container } = render(
      <I18nextProvider i18n={i18next('https://test/')}>
        <FromNow
          timestamp={Math.floor(newDate.getTime() / 1000)}
        />
      </I18nextProvider>
    );

    expect(getNodeText(container.querySelector('time'))).toBe('10 days');
  });

  it('should render time with text: 10 months', () => {
    const newDate = new Date();
    newDate.setMonth(newDate.getMonth() - 10);

    const { container } = render(
      <I18nextProvider i18n={i18next('https://test/')}>
        <FromNow
          timestamp={Math.floor(newDate.getTime() / 1000)}
        />
      </I18nextProvider>
    );

    expect(getNodeText(container.querySelector('time'))).toBe('10 months');
  });

  it('should render time with text: 10 years 8 months', () => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - 390 * 10);

    const { container } = render(
      <I18nextProvider i18n={i18next('https://test/')}>
        <FromNow
          timestamp={Math.floor(newDate.getTime() / 1000)}
        />
      </I18nextProvider>
    );

    expect(getNodeText(container.querySelector('time'))).toBe('10 years 8 months');
  });

  it('should render time with text: -', () => {
    const { container } = render(
      <I18nextProvider i18n={i18next('https://test/')}>
        <FromNow />
      </I18nextProvider>
    );

    expect(getNodeText(container.querySelector('time'))).toBe('-');
  });
});
