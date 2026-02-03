import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

describe('Card Components', () => {
  it('renders card with content', () => {
    render(
      <Card data-testid="card">
        <CardContent>Card Body</CardContent>
      </Card>
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByText('Card Body')).toBeInTheDocument();
  });

  it('applies className to Card and subcomponents', () => {
    render(
      <Card className="custom-card">
        <CardHeader className="custom-header">
          <CardTitle className="custom-title">Title</CardTitle>
          <CardDescription className="custom-desc">Desc</CardDescription>
        </CardHeader>
        <CardContent className="custom-content">Body</CardContent>
        <CardFooter className="custom-footer">Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Title').closest('h3')).toHaveClass('custom-title');
    expect(screen.getByText('Desc')).toHaveClass('custom-desc');
    expect(screen.getByText('Body')).toHaveClass('custom-content');
    expect(screen.getByText('Footer')).toHaveClass('custom-footer');
    expect(screen.getByText('Title').closest('div')?.parentElement).toHaveClass(
      'custom-card'
    );
  });

  it('renders default semantic elements', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Semantic Title</CardTitle>
          <CardDescription>Semantic Description</CardDescription>
        </CardHeader>
      </Card>
    );

    expect(screen.getByText('Semantic Title').tagName).toBe('H3');
    expect(screen.getByText('Semantic Description').tagName).toBe('P');
  });
});
