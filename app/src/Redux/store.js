import {configureStore} from '@reduxjs/toolkit'
import publicSlice from './PublicSlice'

const store = configureStore({
    reducer: {
        public: publicSlice.reducer
    }
})

export default store