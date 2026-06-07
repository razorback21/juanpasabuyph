import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import FsLightbox from 'fslightbox-react';
import Lightbox from '../../../../../resources/js/Pages/Store/components/Lightbox';

// Mock FsLightbox to prevent actual lightbox rendering in tests
vi.mock('fslightbox-react', () => {
    return {
        __esModule: true,
        default: React.forwardRef(({ toggler, sources, slide, onClose }, ref) => {
            React.useImperativeHandle(ref, () => ({
                open: vi.fn(),
                close: vi.fn(),
            }));
            return (
                <div data-testid="fslightbox" data-toggler={toggler} data-sources={sources.length} data-slide={slide}>
                    Mock FsLightbox
                </div>
            );
        }),
    };
});

describe('Lightbox Component', () => {
    let lightboxRef;

    beforeEach(() => {
        lightboxRef = React.createRef();
    });

    it('should render FsLightbox component', () => {
        const mockSources = ['image1.jpg', 'image2.jpg'];
        render(<Lightbox ref={lightboxRef} sources={mockSources} />);

        // FsLightbox should be rendered but toggler should be false (closed)
        const fsLightbox = screen.getByTestId('fslightbox');
        expect(fsLightbox).toBeInTheDocument();
        expect(fsLightbox).toHaveAttribute('data-toggler', 'false');
    });

    it('should open lightbox when open() method is called', () => {
        const mockSources = ['image1.jpg', 'image2.jpg'];
        render(<Lightbox ref={lightboxRef} sources={mockSources} />);

        // Initially closed
        let fsLightbox = screen.getByTestId('fslightbox');
        expect(fsLightbox).toHaveAttribute('data-toggler', 'false');

        // Open the lightbox
        lightboxRef.current.open();

        // Now should be open
        fsLightbox = screen.getByTestId('fslightbox');
        expect(fsLightbox).toHaveAttribute('data-toggler', 'true');
    });

    it('should open lightbox at specific slide index', () => {
        const mockSources = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
        render(<Lightbox ref={lightboxRef} sources={mockSources} />);

        // Open at slide 2
        lightboxRef.current.open(2);

        const fsLightbox = screen.getByTestId('fslightbox');
        expect(fsLightbox).toHaveAttribute('data-toggler', 'true');
        expect(fsLightbox).toHaveAttribute('data-slide', '3'); // slide prop is 1-indexed
    });

    it('should open lightbox at specific slide when using goTo()', () => {
        const mockSources = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
        render(<Lightbox ref={lightboxRef} sources={mockSources} />);

        // Go to slide 1
        lightboxRef.current.goTo(1);

        const fsLightbox = screen.getByTestId('fslightbox');
        expect(fsLightbox).toHaveAttribute('data-toggler', 'true');
        expect(fsLightbox).toHaveAttribute('data-slide', '2'); // slide prop is 1-indexed
    });

    it('should close lightbox when close() method is called', () => {
        const mockSources = ['image1.jpg', 'image2.jpg'];
        render(<Lightbox ref={lightboxRef} sources={mockSources} />);

        // Open the lightbox
        lightboxRef.current.open();
        let fsLightbox = screen.getByTestId('fslightbox');
        expect(fsLightbox).toHaveAttribute('data-toggler', 'true');

        // Close the lightbox
        lightboxRef.current.close();
        fsLightbox = screen.getByTestId('fslightbox');
        expect(fsLightbox).toHaveAttribute('data-toggler', 'false');
    });

    it('should pass sources to FsLightbox', () => {
        const mockSources = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
        render(<Lightbox ref={lightboxRef} sources={mockSources} />);

        const fsLightbox = screen.getByTestId('fslightbox');
        expect(fsLightbox).toHaveAttribute('data-sources', '3');
    });

    it('should force remount when opening multiple times (key counter)', () => {
        const mockSources = ['image1.jpg', 'image2.jpg'];
        const { rerender } = render(<Lightbox ref={lightboxRef} sources={mockSources} />);

        // Open first time
        lightboxRef.current.open();

        // Close
        lightboxRef.current.close();

        // Open again - should work due to key counter
        lightboxRef.current.open();

        const fsLightbox = screen.getByTestId('fslightbox');
        expect(fsLightbox).toHaveAttribute('data-toggler', 'true');
    });

    it('should not unmount FsLightbox when closed', () => {
        const mockSources = ['image1.jpg', 'image2.jpg'];
        render(<Lightbox ref={lightboxRef} sources={mockSources} />);

        // FsLightbox should exist even when closed
        const fsLightbox = screen.getByTestId('fslightbox');
        expect(fsLightbox).toBeInTheDocument();

        // Open then close
        lightboxRef.current.open();
        lightboxRef.current.close();

        // FsLightbox should still be in DOM
        expect(fsLightbox).toBeInTheDocument();
    });
});