import { useState, useRef, useEffect } from "react";
import { MessageCircle, Clock, Zap, ShieldCheck, Send, ChevronRight, Check, CheckCheck, TrendingUp, ShoppingCart, AlertCircle, X, BarChart2, Search, Package, Wrench } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const LOGO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQQFBgcDAgj/xABEEAABAwMBBQQHBQcCBQUBAAABAgMEAAURIQYSMUFRE2FxgRQiMpGhscEHFUJS0SNicoKS4fAzVDRDU2PSJCVEc8IW/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAIBAwQFBv/EACgRAAICAQQBBAICAwAAAAAAAAABAgMRBBIhMVEFEyJBMmFScSMzQv/aAAwDAQACEQMRAD8A3GiiigAoopDQAteHFpbSVKICQMkk4AqNv18g2KEqVPe3EgeqgaqWegHOsZ2p2xuW0K1IUVR4WfUjIVx71nn8qSc1E1afSWXvjovm0n2kwYKlx7Qn018aFzOG0nx5+VZnetoLre3N64zVuIzkMpO62P5eHvzUWO751L2S0tXJLnazEsL3ghkEe0rBOCffWWVkmdurSU0LoiBpyxT5FrkGIiU4WmIzhwhx1fHwA8DXKfCkW6QtiWgpUO7QjqD0qbi/+t2ImND24TwcT4cT8Cr3VW2XynhLAygWyJOd9GZuYEhYO4ktKSlR6Zos9rQ9fRbp6VpwVBQSrByB1+NdbHDaYuDLsh1sSG8Lai7+FKXyBVy18692t2UrbFl2YgofW8rtEkYx6p0+VAjb55+hrb7UJt8dgbykoacd4cSEkjHjXIyITLi2nLV7B3VJU+rfT49/lXu7OPQtoZzkZxTbqZK1JUk6jJz9ak0Xu33Xdb2ghpS6BhMtjII8Ry+IoD5JJ/RCzzAWppUBD7ef9VDpB3T3GvSILUlSUQpSHHFHdDbgKFEnoeBr3e7Z91ykoS92zLiAtpzqmnuxkYPXtLy9G4qC6o9+MD9fKgZyShuiRUuDLhkiTHcaGeKk5B8+FcmXnWXUusOuNOA+qttRSoeBFOZFxkOT35bDzjZecKgEnAxyHuxXpmBLnoVLUlttn8TzmG0E93KpTx0NnK+RbNnftKuMHdavA9MY4dqMBwfQ1p9lvtvvcbtrfIS4B7SM4UjxHKvn9yE6lvtm1IfbT7RZUFbvjXmDMk26SmVCkOMPo4LQfn18Kuja12YNR6fXZzDhn0vRVB2L+0Fm7KRBu4THnH2HBo29+h7qvowa0RkpLKOLbVKqW2SFooopisKKKKACiikPCgBar21+1ETZuD2r2HZK9GY4OCs9T0SOZ+ZIBc7TX6Ls/a1zZJyfZabB1cVyArBrxdZd5nuTZy951fAZ0QOQFV2T2m7R6R3PdL8Rb1dpt7nKmT3u0cVwSNEoHQDpXiDb3ZaQvfaYZKsdq8sIST0HU0tnbhO3Jhu5OKRHUrBKevIE8h305v8ABmx7mIr43944jhA9UpJwAkcuhrHJ5fJ3ViK2R4G90tUm0uJTJCCFDKFtnKVDuNKykqsshYyOyktKGNMZChUwzItciJEtFxfeK2VEB9rHZpUdMZ4kDhnGPKhq0ORo9+ty1pUpCWloUSEhWMkanhUITfxh9nq1XCPeoa7de+LaN5qT+JIzrn4a8xnPDV5s9bX7XcZkCXhyNLYJQ4B6rmPrhXCquVMxWHUIdD0h1O4pSPYQnOoB5k9eGvPjXJybKcabZU+6W2wQgbxwmjBLqbyl0eJBUuS6pZO9vq3iOuanJV6ivybTNUHDLj49JISPWA+Z/Wq/7/OipLHBPslpU22zLxNkymJRYfUC3uEBaDgZOpwedN3GrQk7yJs1SfyejDe9+9imNFAKGOhzcJYlKaSlBQyy2GmkFW8QkdTzJzU1bz6BshcJQV+2mK7FBzqBw+W8arg40ZJTuk6ZzjOmetAShlJHeBF9NnMRBoHlhBI0wM648qktqpgcuKoTPqw4f7NptPDI4n6eVRcV9cWU1JaP7RpYWkHgcHNPr2gPynbjF3nI0g7xUNS0o8Uq6a0ENfPnoa219cWew43jIWARx3gTg57sU42hhogXd9lrRAIUkHkFAHHxrvYLd2kgTpmWoLB31uuaBRHADqc0/YiC93CTerj+wtqFaFem/jQAd3X3eENiuaUslXHL3itH2D29Uytu13t3LSiEMyl/hPJK+7oaqdxmxL1M7NtlMQjCIzmMA8sL8evKoZ1tbTi2nUqQ4hRSpChwI5U8ZuL4EtqhfHbNH02ghWoNeqy/7NNsiVN2W6unOiYryz7X7h7+laek54VsjJSWTzt9MqZ7ZC0UUUxUFcpD7cdhx55QS22kqUo8ABXs5rMvta2hKEt2KKvClgOSinkn8KfPj4DvpZS2otoqdtigimbY7Qu7R3dUhW8mM1lEZs/hTzPicZ91QVL9TRWJtvlnp4QVcFFfQcjVv2ZuDFzTHt1wJ9IYWFxnSdSAOHjiq3cIKoPYodWkurQFqbHFvPAHvpqlSkKStClJWkgpUk4II4GlwEoKa4HxtK4z7iJ+WWmF7pVj/UPRA55HuzXO6z13Oc7KcJCXN0BAOgSBoP8AOtc5s2TOfL8t0uOEYJPADoByrhRgFHyFFHPFTtp2XnXAJccBjMn8Sx6x8B+tHQ0pxj2yCpEkKVup1V0HGtHhbKWqMAXWTJWDnLxyPdw+dTDDLcZO5HbQ0j8qEhI+FK5GWWsgukZOmHLUMpiSCOoaV+lc3G3Gv9VtaP40EfOtfOpzS50xRvEWt/RjgIIyNfDWitUl2a2zM9vDZKjxWhO4o+Yqu3LYsbu/bn9Rwbe+hqVIuhq4Pgp1e2XnGF9oytTa8Y3kKIr3MiSYTxZltKbc6KHGuNMjRFp8ok7e43cbghN5mu+joG8e0USDpwHSnd0vzU530XsAm2IwlDaR6wxwV491QNJijArrjnJPW7Z4vupeVMiCCk7yne11x03eRpntFLZm3h96Nq0SAFAe1gYzUaQk6kDPfTqfCdhqb31JcQ6gLQ4nUKB6UEKPyy2NhkEEEggggg4IPI1t32dbUff1t7CWsG4RgEun845K/XvrEQdakdnrw9YrrHnsZPZnDiB+NB4irK5bWUazT+9DjtH0ZmjNN4MlqZEakx1hbLyAtChzBFOK2HmnwNbnOat0B+Y+cNstlateg4V86XGa9crhJnPqy7IcLi88s8vIACtS+1+7Fi1R7Y0rC5S95ePyJ/uRWS8gKzXSzwdv0ynbHe/sKlLK02yh26SkbzMYgNtng66fZHgOJ8KjEJUtaUIGVqOEjqeVSl+Ulgs2xrVuIPX/AHnT7R+lUHSl/EjpDzsh9bz699xw7ylda50UUDJYQV7YZckPIZYQVuLOAkca8AE4CRlR0AAySa0TZexptUcPSUgy3R6x/J+6PrUN4K7bVWjxs/swxbgJE7D0rHqgjKUeA69/uxVg7zmlpKrbbOXOcpvLCilHgcUhIT7RAHeagTHgKK5qkMJOC82PFYr0l1tXsrSfBQqScS8Hqil5aZpKCBtcIEW4MFmWylaeR4FJ6g8qz6/2J60Ob2S7GVolzHPoelaVXOQw3JYWy+gLbWMKSalMuqucH+jIqKk9oLQu0Ti3qY69WVnmOh7x+lRlWJnVjJSWUGnPhUvbVfeUZy0ukF3VyGo6bq+aPAj41EUra1NLQ42opUhQUkjkQc0ESWUIRuqKSCCNCDyPSgHFSl+Ql1TNyZSA1MTvKA/C6NFD61F0ExllZNV+x+9FyG/Zn17ymCXGMnXcJ1HkTnz7q0gV88bKXNVn2ghzAcICwhz+FWhr6FQoKSFA5BGc1rqlmJ571Cn27crpmGfaTcPvDayUEHLcUBgeIGT8Tjyqr11mPmXOkylZy+8tw/zEn61y4Vlk8vJ3qa9laj4RKbOpSma5MdGW4bSnznqNEj31GOLU64pxZypZ3leJ41KIPo2zby+C5kkNjvQgZJ95xUSKgmPLchaKKAcHQEnkBzoHLPsRaxIkqnOjKGdEZHFf9qvZOeIplZYIttrjRRjebT6x6qPH408qtvJx7p75i1G3m8xbQyFPkrdV7DSOK/0HfUkONZ2uOu+Xee66+UKacwnGuACR8MfGoSJprjJ5l9Eg5cb9dcFoJgsKHnj5muRsKn/+Nnvunng6fGuXpVwtC0pn5kxicB0cv86GpNq6wHEBQlNjuUcHw1qX+jS00vghkNmbfjBCiepIpDs1GScsOvtK6pVRMvgUoMW1HbOq0CgNBXhNlmSR2k6e6Fn8KDkCjklbvtnVMa+W8lcKd2yf+m6fa9/H4VI2vaoOPiLdmPRHyQAs6IJ7+njwqHVEudr/AG0aQZLY9ptWpxRMnQLrb1h0pakJSdzf4g9Ae/hQQ4KXfJfjoaSqbZNq2osONGuDboCfVD4GQR/arkhQWkKSUqSrUFJyCO6oawZLK3B8kffLam529xggBz2mz0UP8+NZepJQtSFAhaSQpPTGlbBWebawxFvHbIGESUb+g/ENFfQ+dNFmnR2c7SBo8KKKc6BK24iXZp0M+0yBJZ8tFfCokcKktnn0sXiNv/6biuxWO5Wn1pjIYMaQ7HVxaWUHyJFAkeJNHjGRg8DpW/7EXL702XgSSrK+z3HP4k+qfiKwCr99n21LFmsr0SSr/wCSpaB0SUp+uatqkkzHr6XZBbe0UGiigd1VG8k7r+ztdmj9GFvY/jXn6VGV3lS1ygwHEpT2DKWE7udUjOM68da4UCxWEFSGz7HpN7hNq9ntd8/yjP0FR9T2xKd6/JP5Wln5D61D6IseIM0SkpaSqjiiis6kMzYm0k1MFsuOo3nOz/6iCckY59ffWiVWtqmH4UuLfYQy7GUA4OqevhgkHxFNE0UTw2vIxjXqFKBakAMLI3VNujIzzH9jXs2e1vnfQwk5/I4cfA1axAsW1EFE1yK25vj20+qtB6ZFRb/2eQSSqJPlM54JO6sD4A/GmcRlbBcdDWLDjxARHYS2VcSBqfE11IwM8Bxrz/8AwMpJwL86By/Yn/yr2n7PQr/irzIX/A0AfeSflUbAcq+3IaSbnEjjLz6M8kpOSard0X94NOzYsENx2yAuSRgqJIGOh41oVv2JsUNSVLZXKcTwVIXvD+kAD4VBbRSBf7zHsduwmHGVvPLbGEjrjHQaDvNSopD12R3fEYLehxdiAw+40t5eVISlWVBROc91WXZtt1qxQkPghYb4HkMnA92KbRtlrPHf7VMdSyDkJcWVJB8OHvqbNK2VW2JrEQqsbex+0tTD4A3mXh/SrT5hPuqz1D7Wo39npncEq9yqhdiUvFiZmtFFFWnYALLZC0+0k7w8RrUntKgJvssp9lxQcH8yQfqajMZ0605nzFznUOLSEqS2ls7vPdGM0CtfLI2pKWigYPDjT21xmZkhTTrM90YylMFCVLznnvaYplyzTm3EelBBmGEgggvAKPlhOtAsuiWudrgwYRedgXxsueo2qUWUgK7wNagOlT03smbE80w/LuAdkIUqSthaWmSkEYBVzOcHNQNAlLbTCp7Yhe7f0A8FMrHyP0qBqQ2ekCLe4bqjhPabh8FafWofQ1izBmo8NKKXqT51xlSGIjCnpLiG2hqVLPw8aqOMl9I61zkKZSwv0lSA2RhRXwI6GqxL2mmTu1bsUNxbbYKnH1jRAGueg86ioEBy9IEy5SnXskgIJ6aeVNjBfGh4zJ4OibojZu5qcsU1uVDdI7SPkkDuz8iCautp2xtFxSkKfEZ8jBbe017lcDVFvUCO25Chw2gl2S8lsK56kJHxNaDcNlrLPADsQJIGN9v1Tjyp0Pd7WE39kuHmlJBS6gg8CFCmU+9Wy3pJmTWW/wB3eyo+AGpqvH7PLYCQ1KlNp6JIOfhTqFsJY4xClsuPqHJatD5cKkztVfyyV7aLbldwHolrSqNHWd1UhftKHcBnA+PhUlswi1xYnYwZbTzytXFZwpR8DqB3Uz+0GBHhTbVIaYaQwctLSkYBwQRp4FXupnJ2fhLwtneZUNQUHQeFLI1YhKtJcZLrjBPdxpKolsud8hvSWo6HJzcX/USRvEJ69fnVls+0EK74Q2vs3zp2SuPkedK4lE6ZR57Jeofa5W5s7L6EJT71AVMDXUa1WdvJHZ2pqODq86MjuGvzxULsilZmih0UUVadge2WOJd3hR1BJS68EkKzgjmPcKlUptFwYuIjWhyM5GaLja1SFnABx6w4A0ysjcOTlt1DofZy+HGVBKihIycE8wcEU9vN4YnQXG2blMUrI32nY6E9oe9SePnUmaxtzwiuA9+aWg8dOGKSoNP9naawYsyRGIOWHltH+VRH0rrapKIVyjSnEb6GnAopHSp37SbeYG10opGESUh9OOGTor4jPnVXxkY600liWCqqXuVKXkuSlOybc8mEmQ7DMRxsSZKgy2pbjhWpWDxxpgiqdyHWrM4i33lUN56bJU8WUt+gRmt9SCkY05JBxnzqFu8FdunuMOMra4KSlwgr3SNM40zUFdGE2hnSeZHeOVLR8qg0miq2kisWOPPeWFPOIADSTqpQ4+Wab2rZ2dtE8m5X9S24+MtRhocfT51A7EJgOX9hNySDoewB9nf761wE54/2qEsHMufsvbEg9oWWLdsncWojaWWkR1BKUDAyRj/DVTsCNy0seBPvNWbb5zs9lJnVSm0+9Yqv2pO5bow/7YpZ9C1/62/LGVzhz13OPMgra3mACjf/AAqHPHOnP3ntd/u439I/Sn9N5stmEz2shRCM4yBnWlUmWbs8YycPvPa//dxv6R+lH3ntd/u439I/SlF1jFO8EvlOMghlWMV2iTI8wEx3Avd4jgR5VO5k9f8AKIu6o2hu7KGbg9HdbQsLSBgYOCOnQmphpKkspS5gqCAFEczXTTxpdKVvIkpZWBtsavsts7g0dAtrez4Y/WpzaHZKFdgX2EiNN4h1A9ojhnHzqvWJXY7fN/8AdjKT58f/AM1olWroS6bjNSXgz+3XiVbZv3TtCN14YCJBOixy15jvqD22miVeOxbVluOkIGPzHU/T3Vdtv0QDYlrnoBcBxHI0Vv8Ad3Y41lWc+0SfGjHJp06U37mAoooHEcQM64qTb0T+ybLqH/SkS3Y47VEZPZNhSlqWeGugFedpXVltkD0Nxl5ThbfZYDayEKKTvY48j51JW9v0Btpezk2JPUpPaPR5Ct1RP4SlORuqAzqDUDfXnTOVEcMcIifs20Rk4bRzONdTnietSZY/O3JHGr99n+yzF6srsuQkZ9IUhHeAlP1zVAJwCelb/sPbjbNl4EZSd1zs+0cH7yvWPzqyuKbKtfe661jsrX2v2oyLZHuTafWjL3VkfkV/fFZNwr6SukFq426RDfGW3kFB7s86+dbjCets+RCkjdejuFtXf0PgRr4EU10cPJV6ZdmDrf0OrTJmFtcCNMbiMukrccWrcGANcq44wOFPri3GmWpDMGaqW9bELW+txsp30KUNUnok9euar4xkFQyM61ZvSoX3KVuMrhwX3ezRHh4Lr5SMkrcV+EZGnPwqg2Wx2yUkVminl1hIgvthhanI7rSXW1LGFbp5KHI0zIxQXp5SaAHBBBIUNQQcYrVtjdpE3mII8lQE9lOFjh2g/MPrWUV1jSHoj6H47hbdQcpUOINBVdUrF+zSvtLc3dnm0c3ZKE48Ao/SmMZO7HbT0QPlUHftpTf7ZBjvtFuS1ICllPsr0IBHTjU+MAYPLTwpJmTY4QUWLURtQf8A23hxdTwqXqI2o0to/wDsTSR7Cv8AIcQ5cZm3xA++2lRYRopWM+qOVR1qUJG0EqTFx6OAQTj2tAPnmntjiNtQGHVp3nHEJUSRk4I0HupjgI2pCYY9XdHahHDhr9KYtwsyRYQMDhzoo/zFHI0hmI1k9ltxaF5wFEg/0qH1rQ5MhmJHW/IcS202klSlcqzS8PpiXe1S1+y06lSsdAoE/DNMdpdppN9d3cFmGk+oznj3q7+6rl0WSpdjj4OW098evlxLxyiO36rDf5R1PefhwqIooqTfGKisIKk4NsWFQpkxpRt63UqeUOCWwsBRV0GvuqMGpATqTwA51cLY05Cim0R5kd24rVvvW6Qglt3TO4FkABWNcZ49KCu+W1YQ4vLTv3eoXNDC20NOOtvtAJCXCrDSG8cdB8ao2cgc9KfXYsCSURmH424SFx3XN8NrzqE91MvnUkVQ2xySuylsVeL/AA4YGUlYU5/ANTX0M2kJQABgAYA6VnH2Q2QsxZF4eTq+ezY/gHE+Z08q0kCtVUcROL6jd7l2F0gxWY/a3s8VBN9ioypCQ3KAGm7yUfDh4eFafXGVHakx3GH0BbTiSlSTzBp5rcjNRa6bFJHzN1GPOpC23FUdHojsePJjuOBQbkJylC+G8Omnvp5ths87s7d1x1hSozhK4zmPaTzHiNB7utQeMgisTTTwemi43QUkXK4x4rzbwuZa7dLjrDkpOUBgpRvNhCeGCOXOqbkeeAcCnMm5TJLDLMuW44yzo2latE1PTrE8mBAaU2zGbQ32z8p5QT6yuCRzOBjSgrj/AIvjJlZ50ldA04oOLQhTiG/bWkEga48q8VBoE/zwqVgXuVFSEOHt2uQUdR4VF0lGCGk+y5Rb7CkAbyyyro5oPfwp2+zGuLG6sh1sHPqK/SqHzzzoGhChoRwIpNpnenWcouwtMUAJw6EgYA7VVdosGPECvR2dwq9peNT51SBJkAYD7oHc4a8LcW4MOLWofvKJo2Eew/JeH7jDj/6shsK/KFAq9w1qImbSDG7CaVn86/oKreB0pTrxqVEeOnijrIkvSllb7hcV38q5UUUxeljhBQAScDieFHLA1NSo2euCra9LLe6psJV2BI7QoPFe7xx40Cyko9nq5It9rSqF2Kn5yEArkFzAbUcHRPd30+n3JuHMEuRbwm8FoLDqXT2WVJwFlPXHxpmq72+Ylt26QXHpSEhPaMu7qXccN8fpUdcJa58tclzAKjgJTwQBoEjwqSmNbl2NxnmonPU5JqQ2ftL18urEBjI7Q/tFg+wgcVf5zqPAJIAznh6oyT5c6277OtmPuK2dvKbAnSgFOZ/5aeSP1p647mJrL1RXhdlogxWoURmLHQENMoCEJHAAaCnFFFazzT55CkPCloqQIbamwRdorWuHKGFe004OLa+RH16jIrBrxbJVnnuQpze463z5KHIjqDX0irhVf2v2XibSwg26eylN5LEhKclB6Hqnu+VV2V7jdo9W6ZbX+JhUGa5BdU8w2yp3dwlbrQX2Z/MnPA15lSpM57tpbzkh1WmXFZ93Tw4V3vFpm2acqJcGezcTwI1SsdQeYpiayNNcM762zSkuS5CL6Ps7Mtdta9IlqW0iS43rvOHUpB/KkDjUNdbGbZCjuOyELlyCVJjsgr3UDmT46U0g3F6OgRlOOmGtwLeZaUElwcxmp6POuFwgSZFqwm4OSQHENkBaGAkBCUZ/DnPxzQZ2p1vsqngc0Var1AivLL05xEZURCETno7e+X5CxncSnIGgGSe+ouXYnW0MvQ3USmX21utEDdVuIGSVA8MfOoLo3RZE0V2ixlyX2mkYT2q90LWcJBxzNcThK1J3gSCQCnUGgsygoopUJK1pQMZUoAZONaCRKK7OxnmZS46mip9skKQ36/Djw5VzeZdZUA8hSCoBQCgQcdaCFJM813hwpM1woiMrdUkZIGMAd5p/boUM2mRcpXaSfR1hBiJPZglXAlYyd3jw51KBNu+5w204q3s3NO+guqK0tuNqwUlXEoVnj1qcFM7scLs4CyCDFuCX2O2uTKUONoJ/Zlo4JWnHtY1BFdU3G2ouhvzUtztiN70Mtne3ynG7vcNymsq6tw4cCLCfU9Khb+Jo9kpUSS2EkeskZAz3VAkkqJPE60CRrc+ZHR93tn1u7iG95RO6j2QegHIVyJAGTwFLWjbA7BqkON3S+t4aT6zMVWm8eSld3QVMIuTHvuhRDMjr9m2xp32r3dWuHrRWljgfzkfKtRSKVIxp0pa2RiorCPOX3SunukFFFFMUhRRRQAUhpaKAIm/WGBfoSo1wZ3h+BY0Ug9QaxnajY657Oula0qkws+rJQNB3KHFJ7+Fb5XhxCXElK0hQIwQdQRSTgpGnT6qdD46PmTiM4pUkhYUk4UnUKHI1ru0n2awpxU/aF+hvn/lYy0ry5eVZlerDdLG6UXGG40ngHQN5s/zDT31mlW0d2nV1XLjs9W24KV2sOVHE1uU6lakqWUkOcAreGoP0qYnTYf3jcILbjMZsQTBjOLJ7NJyCsEgEgHBGe6qpzxrnrQTnGTvZ86rLXSpPJb4hZgRYrbb8eR6HCkzXFNK3kFwjdSnJAzxpY6m/vWz2ZUSMth2G32+80N8koKid7liqfjwz1ro3IeadDzbzvaIGErKjkDGMe7SpEen/AGTrTbEOLaW27Y3N9PTvOuOJJOd/d3U9CBinV1THt0S7qjQo++3ciygqRvdm2WwcDzB95qvxbnPiMrYiTXmWlHJQlWnj3eVcn5kl8Oh19aw6vfWFH2ldT31AKmWeS2y0ub9xYsZS1PeLD6UpUltTjJR6wQSQNFanXhUVtSvtmrap6Uy/NQx2ckNrCilQPPHcagnFF0/tCV40y4c4pOXD3VJMaMPOSX2YuCYdyLchwNxpSC06tQBSnPsqIPQ0xnzpM51KpbqVlCdxCWxhCR+70HOm2DXppp151LTLTjrijhKG0lSj4AUIscUnuPPHhXaFEkXCUmNBYcffc0ShKc58+Qq57O/Zrcp+69diYTB17PQuEfJPz8K1CyWG32NjsbdHS2D7S+Kl+J51bGpvsw6j1CEFthyyq7GfZ8zaiiddwmRNGqGhq21/5Hv93ffQOFeqK0qKS4OJbbO2W6TCiiipKwooooA//9k=";

// ─── Brand ───────────────────────────────────────────────────────
const C = {
  bg:      "#200505",   // fondo principal
  bg2:     "#2E0808",   // fondo secciones
  card:    "#3D0A0A",   // café profundo — logo
  red:     "#A52323",   // rojo Baristop — logo exacto
  redHi:   "#C03030",   // rojo vivo — hover / CTA
  redDk:   "#741515",   // rojo oscuro — bordes sobre claro
  redDim:  "rgba(165,35,35,0.15)",
  redBdr:  "rgba(165,35,35,0.28)",
  cream:   "#F2DCBA",   // crema Baristop — SOLO para UI de marca
  // Neutrales para texto de página (no cansan)
  txtH:    "#EDE8E2",   // headings — blanco cálido neutro
  txtB:    "#A09488",   // body text — gris medio neutro
  txtD:    "#605850",   // dim / timestamps / hints
  txtEm:   "#D4CFC8",   // emphasis dentro de párrafos
  waGreen: "#00A884",
  waBg:    "#0B1015",
  waChat:  "#0C1317",
  waIn:    "#1F2C34",
  waOut:   "#005C4B",
};

// ─── Bot persona ──────────────────────────────────────────────────
const SYSTEM_PROMPT = `Eres "Bari", el asistente de WhatsApp de Baristop Distribuidora — empresa especializada en insumos y maquinaria para cafetería. Hablas con dueños de cafeterías, baristas y restauranteros.

CATÁLOGO EJEMPLO (insumos y equipo):
🫘 Café grano Blend Espresso 1kg — $280 MXN
🫘 Café grano Origen Colombia 1kg — $320 MXN
🥛 Leche en polvo entera 1kg — $85 MXN
🧴 Jarabe saborizante (vainilla/caramelo/avellana) 750ml — $95 MXN
☕ Vasos desechables 8oz c/100 — $95 MXN
☕ Vasos desechables 12oz c/100 — $110 MXN
🔧 Cafetera espresso semi-automática — $8,500 MXN
🔧 Molino de café eléctrico profesional — $3,200 MXN
🧼 Pastillas limpiadoras para cafetera c/10 — $120 MXN
📦 Paquete arranque cafetería (cafetera + molino + insumos) — cotización especial

PAGOS: SPEI · Transferencia · Efectivo · Tarjeta
ENTREGA: Aguascalientes y zona metropolitana. Envío foráneo disponible.

PERSONALIDAD DE BARI:
- Eres el experto amigable que conoce el negocio de la cafetería por dentro
- Hablas de tú, como colega de industria
- Usas lenguaje de cafetería naturalmente: "extracción", "molido", "dosis", "portafiltro"
- Humor ligero y ocasional: "ya tengo tu pedido en extracción ☕", "sin cortes y listo"
- NUNCA exagerado ni payaso — solo calidez genuina
- Mensajes CORTOS, máximo 4 líneas. Como WhatsApp real.
- Si piden cotización grande: toma nota y di que un asesor la prepara
- Si piden maquinaria: pregunta para cuántas tazas/día para recomendar bien`;

const SUGGESTIONS = [
  "¿Qué insumos tienen?",
  "Necesito café para mi café",
  "¿Tienen maquinaria espresso?",
  "Quiero cotización para mi negocio",
];

// ─── Mock data ────────────────────────────────────────────────────
const MOCK_CONVERSATIONS = [
  {
    id: 1, name: "Fernando Ruiz", phone: "+52 449 123 4567",
    lastMsg: "Perfecto, hago la transferencia en un momento", time: "11:04", date: "Hoy",
    status: "activa", orders: 1, msgs: 8, tags: ["pedido"],
    messages: [
      { role: "user",      content: "Buen día, necesito café en grano para esta semana", time: "10:50" },
      { role: "assistant", content: "¡Buen día Fernando! ☕ ¿Qué perfil de café buscas — blend para espresso o algo de origen?", time: "10:50" },
      { role: "user",      content: "Blend espresso, para dobles. ¿Cuánto por kilo?", time: "10:52" },
      { role: "assistant", content: "El Blend Espresso está a $280/kg 🫘\n¿Cuántos kilos necesitas? Para pedidos desde 5kg tenemos precio especial.", time: "10:52" },
      { role: "user",      content: "Dame 10 kg entonces", time: "10:55" },
      { role: "assistant", content: "10 kg de Blend Espresso ✅\n\nCon precio mayoreo quedarías en $2,500 MXN (te ahoras $300).\n\n¿Lo recoges en almacén o te lo llevamos?", time: "10:55" },
      { role: "user",      content: "Entrega por favor, estoy en Zona Centro", time: "10:58" },
      { role: "assistant", content: "Perfecto, Zona Centro cubierto 📦\nTotal: $2,500 MXN\n\nPuedes pagar por SPEI, transferencia, tarjeta o efectivo al recibir. ¿Cuál te late?", time: "10:58" },
      { role: "user",      content: "Perfecto, hago la transferencia en un momento", time: "11:04" },
    ],
  },
  {
    id: 2, name: "Sofía Martínez", phone: "+52 449 987 6543",
    lastMsg: "Genial, espero la cotización", time: "09:35", date: "Hoy",
    status: "cerrada", orders: 0, msgs: 6, tags: ["cotización"],
    messages: [
      { role: "user",      content: "Hola, voy a abrir una cafetería y necesito equiparme", time: "09:20" },
      { role: "assistant", content: "¡Qué emocionante Sofía! 🎉 Baristop es tu lugar.\n\n¿Ya tienes idea del volumen que esperas? (tazas al día más o menos)", time: "09:20" },
      { role: "user",      content: "Calculo unas 80-100 tazas al día para empezar", time: "09:25" },
      { role: "assistant", content: "Para ese volumen te recomendaría nuestra cafetera semi-automática + molino profesional. Es el combo más popular para arrancar fuerte 💪\n\n¿Quieres que te prepare una cotización con todo el paquete?", time: "09:25" },
      { role: "user",      content: "Sí, también necesito insumos del primer mes", time: "09:30" },
      { role: "assistant", content: "Perfecto, te armo un paquete completo: equipo + insumos del primer mes.\n\nUn asesor de Baristop te manda la cotización detallada hoy mismo. ¿A qué correo?", time: "09:30" },
      { role: "user",      content: "Genial, espero la cotización", time: "09:35" },
    ],
  },
  {
    id: 3, name: "Miguel Ángel López", phone: "+52 449 555 0011",
    lastMsg: "Transfiriendo a asesor", time: "16:10", date: "Ayer",
    status: "escalada", orders: 0, msgs: 5, tags: ["soporte", "queja"],
    messages: [
      { role: "user",      content: "Mi molino que compré hace 2 meses ya no muele parejo", time: "16:05" },
      { role: "assistant", content: "Uy, eso no está bien Miguel 😕 Un molino nuevo no debería darte ese problema.\n\n¿Lo has calibrado recientemente o empezó solo?", time: "16:05" },
      { role: "user",      content: "Empezó solo, nunca lo toqué", time: "16:07" },
      { role: "assistant", content: "Entendido. Eso cae dentro de garantía — no te preocupes 👍\nTe voy a conectar con nuestro técnico para revisarlo o reemplazarlo.", time: "16:07" },
      { role: "user",      content: "Okay, necesito que sea rápido porque afecta mi negocio", time: "16:09" },
      { role: "assistant", content: "Completamente entendido, tu operación es lo primero. Un asesor técnico te contacta en menos de 1 hora.", time: "16:10" },
    ],
  },
  {
    id: 4, name: "Café Aromas del Sur", phone: "+52 449 321 8800",
    lastMsg: "¿Tienen vasos con tapa para llevar?", time: "12:40", date: "Ayer",
    status: "cerrada", orders: 1, msgs: 4, tags: ["pedido"],
    messages: [
      { role: "user",      content: "¿Tienen vasos con tapa para llevar?", time: "12:38" },
      { role: "assistant", content: "¡Sí! Tenemos vasos desechables 8oz y 12oz con tapa incluida ☕\n8oz c/100 — $95 MXN\n12oz c/100 — $110 MXN\n¿Cuál talla usas más?", time: "12:38" },
      { role: "user",      content: "Las dos, dame 5 paquetes de cada una", time: "12:39" },
      { role: "assistant", content: "Anotado 📦\n5×8oz + 5×12oz = $1,025 MXN\n\n¿Recoges o te lo llevamos a tu local?", time: "12:40" },
      { role: "user",      content: "Que me los lleven, mismo domicilio de siempre", time: "12:40" },
    ],
  },
  {
    id: 5, name: "Hotel Boutique Nuvó", phone: "+52 449 777 4455",
    lastMsg: "Perfecto, agendamos la demo", time: "Lun", date: "Lunes",
    status: "cerrada", orders: 0, msgs: 5, tags: ["cotización"],
    messages: [
      { role: "user",      content: "Necesitamos una cafetera para nuestro lobby, algo elegante", time: "10:00" },
      { role: "assistant", content: "¡Hola! Para lobby de hotel tenemos opciones de gran presencia 🔧\n¿Buscan algo automático para que los huéspedes se sirvan solos, o para que opere un barista?", time: "10:00" },
    ],
  },
];

const CHART_DATA = [
  { dia: "Lun", mensajes: 22, pedidos: 4 },
  { dia: "Mar", mensajes: 31, pedidos: 6 },
  { dia: "Mié", mensajes: 18, pedidos: 3 },
  { dia: "Jue", mensajes: 38, pedidos: 8 },
  { dia: "Vie", mensajes: 29, pedidos: 7 },
  { dia: "Sáb", mensajes: 45, pedidos: 11 },
  { dia: "Hoy", mensajes: 24, pedidos: 5 },
];

// ─── Phone component ──────────────────────────────────────────────
const formatTime = () => {
  const n = new Date();
  return `${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}`;
};

function PhoneDemo() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "¡Buenas! Soy Bari, de Baristop ☕\n¿Qué le falta a tu cafetería hoy?", time: "10:00" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [usedSugg, setUsedSugg] = useState([]);
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      const container = endRef.current.parentElement;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, loading]);

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput("");
    if (text) setUsedSugg(p => [...p, text]);
    const time = formatTime();
    const history = [...messages.map(m => ({ role: m.role, content: m.content })), { role: "user", content: msg }];
    setMessages(p => [...p, { role: "user", content: msg, time }]);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 300, system: SYSTEM_PROMPT, messages: history }),
      });
      const data = await res.json();
      setMessages(p => [...p, { role: "assistant", content: data.content?.[0]?.text || "Un momento ☕", time: formatTime() }]);
    } catch {
      setMessages(p => [...p, { role: "assistant", content: "Disculpa, error de conexión. Intenta de nuevo.", time: formatTime() }]);
    }
    setLoading(false);
  };

  const available = SUGGESTIONS.filter(s => !usedSugg.includes(s));

  return (
    <div style={{ width: 300, height: 590, background: C.waBg, borderRadius: 36, border: `8px solid #1A2030`, boxShadow: `0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)`, display: "flex", flexDirection: "column", overflow: "hidden", flexShrink: 0 }}>
      {/* Status bar */}
      <div style={{ background: "#111B21", padding: "10px 16px 4px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: "#E9EDEF", fontSize: 11, fontWeight: 600, fontFamily: "sans-serif" }}>9:41</span>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#25D366", alignSelf: "center" }} />
      </div>
      {/* Header */}
      <div style={{ background: C.waIn, padding: "8px 12px", display: "flex", alignItems: "center", gap: 10 }}>
        <ChevronRight size={18} color="#8696A0" style={{ transform: "rotate(180deg)" }} />
        <img src={LOGO} alt="Baristop" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
        <div>
          <div style={{ color: "#E9EDEF", fontSize: 13, fontWeight: 600, fontFamily: "sans-serif" }}>Bari · Baristop</div>
          <div style={{ color: "#8696A0", fontSize: 10, fontFamily: "sans-serif" }}>en línea</div>
        </div>
      </div>
      {/* Chat */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 10px 4px", background: C.waChat }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 4 }}>
            <div style={{ maxWidth: "82%", padding: "6px 10px 4px", background: m.role === "user" ? C.waOut : C.waIn, borderRadius: m.role === "user" ? "10px 10px 2px 10px" : "10px 10px 10px 2px" }}>
              <div style={{ color: "#E9EDEF", fontSize: 12, lineHeight: 1.45, whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "sans-serif" }}>{m.content}</div>
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 3, marginTop: 2 }}>
                <span style={{ color: "#8696A0", fontSize: 9, fontFamily: "sans-serif" }}>{m.time}</span>
                {m.role === "user" && <CheckCheck size={12} color="#53BDEB" />}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", marginBottom: 4 }}>
            <div style={{ background: C.waIn, borderRadius: "10px 10px 10px 2px", padding: "10px 14px", display: "flex", gap: 4 }}>
              {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#8696A0", animation: "blink 1.2s ease-in-out infinite", animationDelay: `${i*0.2}s` }} />)}
            </div>
          </div>
        )}
        {available.length > 0 && !loading && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "8px 0 4px" }}>
            {available.slice(0, 2).map(s => (
              <button key={s} onClick={() => send(s)} style={{ background: "transparent", border: "1px solid #2A3942", borderRadius: 14, color: "#53BDEB", fontSize: 10, padding: "4px 10px", cursor: "pointer", fontFamily: "sans-serif" }}>{s}</button>
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>
      {/* Input */}
      <div style={{ background: C.waIn, padding: "6px 8px", display: "flex", gap: 8, alignItems: "center" }}>
        <div style={{ flex: 1, background: "#2A3942", borderRadius: 20, padding: "6px 14px", display: "flex" }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Escribe un mensaje..." style={{ background: "none", border: "none", outline: "none", color: "#E9EDEF", fontSize: 12, flex: 1, fontFamily: "sans-serif" }} />
        </div>
        <button onClick={() => send()} disabled={loading || !input.trim()} style={{ width: 36, height: 36, borderRadius: "50%", background: input.trim() && !loading ? C.waGreen : "#2A3942", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Send size={15} color="#fff" />
        </button>
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}} *::-webkit-scrollbar{width:3px} *::-webkit-scrollbar-thumb{background:#2A3942;border-radius:4px}`}</style>
    </div>
  );
}

// ─── Audit dashboard ──────────────────────────────────────────────
const ST = {
  activa:   { bg: "rgba(0,168,132,0.12)", color: "#00A884", label: "Activa" },
  cerrada:  { bg: "rgba(90,58,48,0.3)",   color: "#9A7060", label: "Cerrada" },
  escalada: { bg: "rgba(184,32,32,0.12)", color: "#D4282A", label: "Escalada" },
};
const TG = {
  pedido:    { bg: "rgba(184,32,32,0.15)", color: C.redHi },
  cotización:{ bg: "rgba(212,184,11,0.15)",color: "#C8A020" },
  queja:     { bg: "rgba(239,68,68,0.12)", color: "#EF4444" },
  soporte:   { bg: "rgba(83,189,235,0.12)",color: "#53BDEB" },
  entregado: { bg: "rgba(0,168,132,0.12)", color: "#00A884" },
};

function AuditDashboard() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const filtered = MOCK_CONVERSATIONS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.lastMsg.toLowerCase().includes(search.toLowerCase())
  );
  const kpis = [
    { icon: MessageCircle, label: "Conversaciones hoy", value: "24", sub: "+15% vs ayer",  color: C.redHi },
    { icon: ShoppingCart,  label: "Pedidos capturados", value: "44", sub: "Esta semana",    color: "#00A884" },
    { icon: Clock,         label: "Tiempo de respuesta",value: "<5s", sub: "Promedio",      color: "#53BDEB" },
    { icon: AlertCircle,   label: "Escaladas a humano", value: "3",  sub: "Esta semana",    color: "#F59E0B" },
  ];

  return (
    <div style={{ background: C.bg2, border: `1px solid ${C.redBdr}`, borderRadius: 16, overflow: "hidden", maxWidth: 980, margin: "0 auto" }}>
      {/* Panel header */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.redBdr}`, padding: "14px 22px", display: "flex", alignItems: "center", gap: 10 }}>
        <BarChart2 size={15} color={C.red} />
        <span style={{ fontSize: 13, color: C.red, fontFamily: "sans-serif", letterSpacing: 0.5 }}>Panel de auditoría · Baristop</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
      </div>
      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderBottom: `1px solid ${C.redBdr}` }}>
        {kpis.map(({ icon: Icon, label, value, sub, color }, i) => (
          <div key={label} style={{ padding: "18px 20px", borderRight: i < 3 ? `1px solid ${C.redBdr}` : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
              <Icon size={13} color={color} />
              <span style={{ fontSize: 11, color: C.txtD, fontFamily: "sans-serif" }}>{label}</span>
            </div>
            <div style={{ fontSize: 26, color: C.cream, lineHeight: 1, marginBottom: 3, fontFamily: "Georgia, serif" }}>{value}</div>
            <div style={{ fontSize: 11, color: C.txtD, fontFamily: "sans-serif" }}>{sub}</div>
          </div>
        ))}
      </div>
      {/* Body */}
      <div style={{ display: "flex", height: 420 }}>
        {/* List */}
        <div style={{ width: 300, borderRight: `1px solid ${C.redBdr}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ padding: "10px 12px", borderBottom: `1px solid rgba(184,32,32,0.1)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, background: C.card, borderRadius: 8, padding: "6px 12px" }}>
              <Search size={11} color={C.dim} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar cliente..."
                style={{ background: "none", border: "none", outline: "none", color: C.txtB, fontSize: 12, flex: 1, fontFamily: "sans-serif" }} />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {filtered.map(c => {
              const st = ST[c.status];
              return (
                <div key={c.id} onClick={() => setSelected(c)} style={{ padding: "11px 14px", cursor: "pointer", borderBottom: `1px solid rgba(184,32,32,0.07)`, background: selected?.id === c.id ? C.redDim : "transparent", transition: "background 0.15s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.redDim, border: `1px solid ${C.redBdr}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 12, color: C.red, fontFamily: "sans-serif", fontWeight: 700 }}>{c.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: C.txtH, fontFamily: "sans-serif", fontWeight: 600 }}>{c.name}</div>
                        <div style={{ fontSize: 10, color: C.txtD, fontFamily: "sans-serif" }}>{c.phone}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 10, color: C.txtD, fontFamily: "sans-serif" }}>{c.time}</div>
                      <span style={{ fontSize: 10, fontFamily: "sans-serif", color: st.color, background: st.bg, padding: "1px 7px", borderRadius: 6, display: "inline-block", marginTop: 2 }}>{st.label}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: C.txtD, fontFamily: "sans-serif", marginLeft: 38, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.lastMsg}</div>
                  {c.tags.length > 0 && (
                    <div style={{ display: "flex", gap: 4, marginLeft: 38, marginTop: 5 }}>
                      {c.tags.map(t => <span key={t} style={{ fontSize: 10, fontFamily: "sans-serif", background: TG[t]?.bg, color: TG[t]?.color, padding: "1px 7px", borderRadius: 6 }}>{t}</span>)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Detail / chart */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {selected ? (
            <>
              <div style={{ padding: "12px 18px", borderBottom: `1px solid ${C.redBdr}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 14, color: C.txtH, fontFamily: "sans-serif", fontWeight: 600 }}>{selected.name}</div>
                  <div style={{ fontSize: 11, color: C.txtD, fontFamily: "sans-serif" }}>{selected.msgs} mensajes · {selected.date} · {selected.phone}</div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: C.txtD }}><X size={15} /></button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "14px 18px", background: "#0A0203" }}>
                {selected.messages.map((m, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 8 }}>
                    <div style={{ maxWidth: "76%", padding: "8px 12px", background: m.role === "user" ? "#1A2E20" : C.card, border: `1px solid ${m.role === "user" ? "rgba(0,168,132,0.2)" : C.redBdr}`, borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px" }}>
                      <div style={{ fontSize: 12, color: "#EED8B8", lineHeight: 1.5, fontFamily: "sans-serif", whiteSpace: "pre-wrap" }}>{m.content}</div>
                      <div style={{ fontSize: 10, color: C.txtD, fontFamily: "sans-serif", textAlign: "right", marginTop: 4 }}>{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ flex: 1, padding: "18px 22px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 12, color: C.txtB, fontFamily: "sans-serif", marginBottom: 14 }}>Actividad semanal</div>
              <div style={{ flex: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CHART_DATA} barGap={3}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(184,32,32,0.08)" vertical={false} />
                    <XAxis dataKey="dia" tick={{ fill: C.dim, fontSize: 11, fontFamily: "sans-serif" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: C.dim, fontSize: 11, fontFamily: "sans-serif" }} axisLine={false} tickLine={false} width={26} />
                    <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.redBdr}`, borderRadius: 8, fontSize: 12, fontFamily: "sans-serif" }} labelStyle={{ color: C.red }} itemStyle={{ color: C.txtB }} />
                    <Bar dataKey="mensajes" fill={C.red} fillOpacity={0.75} radius={[3,3,0,0]} name="Mensajes" />
                    <Bar dataKey="pedidos" fill="#00A884" fillOpacity={0.75} radius={[3,3,0,0]} name="Pedidos" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
                {[[C.red,"Mensajes"],["#00A884","Pedidos / cotizaciones"]].map(([c,l]) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
                    <span style={{ fontSize: 11, color: C.txtD, fontFamily: "sans-serif" }}>{l}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10, fontSize: 11, color: C.txtD, fontFamily: "sans-serif", textAlign: "center" }}>
                ← Selecciona una conversación para ver el detalle
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────
const features = [
  { icon: Clock,    title: "Atiende 24/7",          desc: "Responde al instante a cualquier hora. Tu negocio nunca queda sin atención." },
  { icon: MessageCircle, title: "Entiende el contexto", desc: "Conversación natural. No un menú de opciones — un experto que sabe de lo que habla." },
  { icon: Package,  title: "Toma pedidos y cotiza",  desc: "Captura productos, cantidades y datos de entrega. Para pedidos grandes, agenda con un asesor." },
  { icon: ShieldCheck, title: "Escala cuando es necesario", desc: "Detecta quejas, garantías o situaciones delicadas y transfiere a tu equipo con el contexto completo." },
];

const steps = [
  { n: "01", title: "Cargamos tu catálogo", desc: "Insumos, maquinaria, precios por volumen y datos de tu negocio." },
  { n: "02", title: "Conectamos tu WhatsApp", desc: "Tu número Business vinculado en menos de 48 horas." },
  { n: "03", title: "Bari atiende, tú vendes", desc: "El agente trabaja. Tú ves el resumen y cierras los pedidos grandes." },
];

export default function App() {
  return (
    <div style={{ background: C.bg, color: C.txtH, minHeight: "100vh", fontFamily: "Georgia, serif" }}>

      {/* Nav */}
      <nav style={{ padding: "18px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.redBdr}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={LOGO} alt="Baristop" style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover" }} />
          <div>
            <div style={{ fontSize: 15, color: C.cream, letterSpacing: 0.5, lineHeight: 1.1 }}>Bari</div>
            <div style={{ fontSize: 10, color: C.txtD, fontFamily: "sans-serif", letterSpacing: 1, textTransform: "uppercase" }}>por Baristop</div>
          </div>
        </div>
        <button style={{ background: C.red, color: "#fff", border: "none", padding: "9px 22px", borderRadius: 20, cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "sans-serif", letterSpacing: 0.3 }}>
          Lo quiero para mi negocio
        </button>
      </nav>

      {/* Hero */}
      <section id="demo" style={{ padding: "64px 40px 80px", display: "flex", alignItems: "center", justifyContent: "center", gap: 64, flexWrap: "wrap" }}>
        <div style={{ maxWidth: 460 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.redDim, border: `1px solid ${C.redBdr}`, borderRadius: 20, padding: "5px 14px", marginBottom: 28 }}>
            <Wrench size={12} color={C.red} />
            <span style={{ fontSize: 11, color: C.red, fontFamily: "sans-serif", letterSpacing: 0.8, textTransform: "uppercase" }}>Agente IA para distribuidoras</span>
          </div>
          <h1 style={{ fontSize: "clamp(34px,5vw,50px)", lineHeight: 1.1, fontWeight: 400, margin: "0 0 22px", color: C.txtH }}>
            Tu distribuidora<br />atiende sola.{" "}
            <span style={{ color: C.red, fontStyle: "italic" }}>Sin parar.</span>
          </h1>
          <p style={{ fontSize: 16, color: C.txtB, lineHeight: 1.75, margin: "0 0 34px", fontFamily: "sans-serif" }}>
            <strong style={{ color: C.txtEm }}>Bari</strong> es el asistente de WhatsApp de Baristop. Atiende a tus clientes — cafeterías, restaurantes, hoteles —
            responde dudas, toma pedidos, cotiza y da seguimiento.{" "}
            <strong style={{ color: C.txtEm }}>Las 24 horas, sin que estés tú.</strong>
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button onClick={() => document.getElementById("demo").scrollIntoView({behavior:"smooth"})} style={{ background: C.red, color: "#fff", border: "none", padding: "13px 26px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: 8 }}>
              Ver demo en vivo <ChevronRight size={15} />
            </button>
          </div>
          <div style={{ marginTop: 28, display: "flex", gap: 22, flexWrap: "wrap" }}>
            {["Sin código", "Setup en 48h", "Sin contratos"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Check size={12} color={C.red} />
                <span style={{ fontSize: 12, color: C.txtD, fontFamily: "sans-serif" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <PhoneDemo />
          <p style={{ fontSize: 11, color: C.txtD, fontFamily: "sans-serif", textAlign: "center" }}>
            ↑ Demo en vivo — escríbele algo a Bari
          </p>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "56px 40px", borderTop: `1px solid ${C.redBdr}` }}>
        <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 400, margin: "0 0 44px", color: C.txtH }}>
          Lo que hace Bari por ti
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 18, maxWidth: 900, margin: "0 auto" }}>
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{ background: C.card, border: `1px solid ${C.redBdr}`, borderRadius: 12, padding: "26px 22px" }}>
              <div style={{ width: 38, height: 38, borderRadius: 9, background: C.redDim, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <Icon size={18} color={C.red} />
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px", color: C.txtH, fontFamily: "sans-serif" }}>{title}</h3>
              <p style={{ fontSize: 13, color: C.txtB, lineHeight: 1.6, margin: 0, fontFamily: "sans-serif" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Audit */}
      <section style={{ padding: "56px 40px", borderTop: `1px solid ${C.redBdr}` }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 style={{ fontSize: 28, fontWeight: 400, margin: "0 0 10px", color: C.txtH }}>Tú siempre en control</h2>
            <p style={{ fontSize: 15, color: C.txtB, margin: 0, fontFamily: "sans-serif" }}>Panel en tiempo real — cada conversación, cada pedido, cada métrica.</p>
          </div>
          <AuditDashboard />
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: "56px 40px", borderTop: `1px solid ${C.redBdr}` }}>
        <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 400, margin: "0 0 44px", color: C.txtH }}>En 3 pasos, listo</h2>
        <div style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap", maxWidth: 780, margin: "0 auto" }}>
          {steps.map(s => (
            <div key={s.n} style={{ flex: "1 1 200px", maxWidth: 230, textAlign: "center" }}>
              <div style={{ fontSize: 44, color: "rgba(165,35,35,0.25)", fontWeight: 700, lineHeight: 1, marginBottom: 10, fontFamily: "sans-serif" }}>{s.n}</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px", color: C.txtH, fontFamily: "sans-serif" }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: C.txtB, lineHeight: 1.6, margin: 0, fontFamily: "sans-serif" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section id="cta" style={{ padding: "56px 40px", borderTop: `1px solid ${C.redBdr}`, textAlign: "center", background: `linear-gradient(180deg, transparent, rgba(184,32,32,0.04))` }}>
        <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 400, margin: "0 0 14px", color: C.txtH }}>
          ¿Tu equipo aún contesta<br />
          <span style={{ color: C.red, fontStyle: "italic" }}>mensajes uno a uno?</span>
        </h2>
        <p style={{ fontSize: 15, color: C.txtB, margin: "0 0 34px", fontFamily: "sans-serif" }}>
          Agenda 20 minutos. Te mostramos a Bari funcionando con tu catálogo real.
        </p>
        <button onClick={() => openLink("https://wa.me/524491234567?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20Bari%20para%20mi%20negocio")} style={{ background: C.red, color: "#fff", border: "none", padding: "15px 34px", borderRadius: 8, cursor: "pointer", fontSize: 15, fontWeight: 700, fontFamily: "sans-serif", display: "inline-flex", alignItems: "center", gap: 8 }}>
          Agendar demo gratuita <ChevronRight size={17} />
        </button>
      </section>

    </div>
  );
}
