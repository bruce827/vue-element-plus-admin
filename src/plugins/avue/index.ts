import type { App } from 'vue'

import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';

// 使用字典
import axios from 'axios'


export const setupAvue = async (app: App<Element>) => {
    await app.use(Avue,{theme:'dark'});
    await app.use(Avue,{axios})

}

