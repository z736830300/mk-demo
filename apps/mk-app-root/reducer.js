import { Map } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option) => {
        const initState = getInitState()

        setTimeout(() => location.hash = initState.data.currentAppName, 0)

        return this.metaReducer.init(state, initState)
    }

    redirect = (state, appName) => {
        setTimeout(() => location.hash = appName, 0)
        state = this.metaReducer.sf(state, 'data.currentAppName', appName)
        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}