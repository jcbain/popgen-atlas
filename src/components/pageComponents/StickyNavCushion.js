import styled from 'styled-components';

const StickyNavWrapper = styled.div`
    width: 100%;
    height: ${({ theme }) => theme.headerHeight};
    z-index: 10;
    position: sticky;
    top: 0;
    background: inherit;
`

const StickyNavCushion = () => <StickyNavWrapper />

export default StickyNavCushion;