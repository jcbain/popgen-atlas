import styled from 'styled-components';

const SpecialButton = styled.button`
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    &.not-triggered {
        font-weight: 600;
        /* color: ${({ theme }) => theme.buttonSecondary}; */
        text-transform: uppercase;
        padding: 1em 1em;
        background: ${({ theme }) => theme.buttonTertiary};
        border: 2px solid ${({ theme }) => theme.buttonSecondary};
        border-radius: 0.75em;
        transform-style: preserve-3d;
        transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
        &::before {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: ${({ theme }) => theme.buttonPrimary};
            border-radius: inherit;
            box-shadow: 0 0 0 2px ${({ theme }) => theme.buttonSecondary}, 0 0.5em 0 0 ${({ theme }) => theme.buttonTertiary};;
            transform: translate3d(0, 0.75em, -1em);
            transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
        }
        &:hover {
            transform: translate(0, 0.25em);
            &::before {
                box-shadow: 0 0 0 2px ${({ theme }) => theme.buttonSecondary}, 0 0.5em 0 0 ${({ theme }) => theme.buttonTertiary};
                transform: translate3d(0, 0.5em, -1em);
            }
        }
        &:active {
            transform: translate(0em, 0.75em);
            &::before {
                box-shadow: 0 0 0 2px ${({ theme }) => theme.buttonPrimary}, 0 0 ${({ theme }) => theme.buttonPrimary};
                transform: translate3d(0, 0, -1em);
            }
        }

    }
    &.triggered {
        transform: translate(0, 0.25em);
        font-weight: 600;
        color: ${({ theme }) => theme.buttonTertiary};
        text-transform: uppercase;
        padding: 1em 1em;
        background: ${({ theme }) => theme.buttonSecondary};
        border: 2px solid ${({ theme }) => theme.buttonSecondary};
        border-radius: 0.75em;
        transform-style: preserve-3d;
        transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
        &::before {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: ${({ theme }) => theme.buttonPrimary};
            border-radius: inherit;
            box-shadow: 0 0 0 2px ${({ theme }) => theme.buttonSecondary}, 0 0.5em 0 0 ${({ theme }) => theme.buttonTertiary};;
            transform: translate3d(0, 0.5em, -1em);
            transition: transform 150ms cubic-bezier(0, 0, 0.8, 1), box-shadow 150ms cubic-bezier(0, 0, 0.8, 1);
        }
        &:hover {
            transform: translate(0, 0.3em);
            &::before {
                box-shadow: 0 0 0 2px ${({ theme }) => theme.buttonSecondary}, 0 0.5em 0 0 ${({ theme }) => theme.buttonTertiary};
                transform: translate3d(0, 0.5em, -1em);
            }
        }
        &:active {
            transform: translate(0em, 0.75em);
            &::before {
                box-shadow: 0 0 0 2px ${({ theme }) => theme.buttonPrimary}, 0 0 ${({ theme }) => theme.buttonPrimary};
                transform: translate3d(0, 0, -1em);
            }
        }

    }
`;

const FunButton = ({children, ...rest}) => <SpecialButton {...rest}>{children}</SpecialButton>

export default FunButton;