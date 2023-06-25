import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import BeerList from './components/BeerList.vue'

describe('BeerList', () => {
    it('should render the component', () => {
        render(BeerList)

        expect(screen.getByText('Beer Index')).toBeInTheDocument()
        expect(
            screen.getByPlaceholderText('Search beer by name')
        ).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Filter by IBU')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Filter' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Reset' })
        ).toBeInTheDocument()
        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
    it('displays "No beers found" when no beers are available', async () => {
        render(BeerList, {
            data() {
                return {
                    beers: [],
                }
            },
        })
        const noBeersMessage = await screen.findByText('No beers found.')
        expect(noBeersMessage).toBeInTheDocument()
    })
    it('should find Buzz', async () => {
        render(BeerList)

        await screen.findByText('Buzz')
        expect(screen.getByText('Buzz')).toBeInTheDocument()
        expect(screen.getByText('Trashy Blonde')).toBeInTheDocument()
    })
})
